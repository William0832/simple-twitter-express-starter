const chatService = require('../services/chatService');

const chatSocket = (io, socket, onlineUsers, rooms) => {
  socket.on('disconnect', () => {
    console.log('=================== disconnected socket id :', socket.id);
    // TODO: refactor by Object.entries(Obj)
    Object.keys(onlineUsers).forEach(async (k) => {
      onlineUsers[k] = onlineUsers[k].filter((e) => e !== socket.id);
      //if no more socket id under user , user set to offline
      if (!onlineUsers[k][0]) {
        console.log(`user:${k} is log out!`);
        // update db state
        await chatService.userOffline(k);
        // 1. after user click chat tab
        // 2. 暫定直接消失
        io.emit('updateOnlineState', {
          userId: k,
          isOnline: false
        });
      }
    });
    // console.log('disconnected', onlineUsers)
  });
  socket.on('login', async (userId) => {
    // push socket id in onlineUser socketIds
    onlineUsers[userId] = onlineUsers[userId] || [];
    if (!onlineUsers[userId].includes(socket.id)) {
      onlineUsers[userId].push(socket.id);
    }
    console.log(`push socket in onlineUser[${userId}]`, onlineUsers);
    // update user state in db
    let user = await chatService.userOnline(userId);
    // console.log(`data of user:${user}`)
    io.emit('updateOnlineState', {
      userId: userId,
      isOnline: true
      // chat: user
    });
  });
  socket.on('logout', async (userId) => {
    console.log('======================== logout userId:', userId);
    // clean socketsId
    onlineUsers[userId] = [];
    console.log('======================== onlineUsers', onlineUsers);

    // update db
    await chatService.userOffline(userId);
    io.emit('updateOnlineState', {
      userId,
      isOnline: false
    });
  });

  socket.on('fetchOnlineUser', async (myId) => {
    try {
      console.log('==================== fetchOnlineUser', myId);
      let elseOnlineUsers = Object.keys(onlineUsers).filter((e) => {
        return onlineUsers[e][0] && e !== String(myId);
      });
      console.log('elseOnlineUsers', elseOnlineUsers);
      let users = [];
      // add user info
      if (elseOnlineUsers[0]) {
        elseOnlineUsers.forEach(async (e, index) => {
          try {
            let user = await chatService.getUserInfo(myId, e);

            users.push(user);
            if (users.length === elseOnlineUsers.length) {
              socket.emit('getOnlineUser', users);
              return;
            }
          } catch (err) {
            console.log(err.toString());
          }
        });
        return;
      }
      // no one is online
      socket.emit('getOnlineUser', []);
    } catch (err) {
      console.log(err.toString());
    }
  });
  socket.on('inviteUser', async (payload) => {
    try {
      console.log('====================inviteUser', payload);
      let { invitedUserId, guestUser } = payload;
      // ====TEST===
      // guestUser = 22
      // ===========
      let chat = await chatService.getChat(invitedUserId, guestUser);
      // check chatId in chats ?
      if (!chat || !chat.chatId) {
        chat = await chatService.postChat(invitedUserId, guestUser);
        // console.log('create new chatId', chat)
      }
      let chatId = chat.chatId;
      // set socket room
      // get onlineUser socketIds(no socketIds still Ok!)
      let users = [invitedUserId, guestUser];
      let socketIds = [];
      users.forEach((i) => {
        onlineUsers[i] = onlineUsers[i] || [];
        onlineUsers[i].forEach((e) => {
          // check repeated socketId
          if (!socketIds.includes(e)) {
            socketIds.push(e);
          }
        });
      });
      rooms[chatId] = {
        users,
        socketIds
      };
      console.log('onlineUsers:', onlineUsers);
      console.log('room', rooms[chatId]);
      socket.emit('getChatId', { chatId });
    } catch (err) {
      console.log(err.toString());
    }
  });
  socket.on('fetchChatHistory', async (payload) => {
    try {
      console.log('=================== fetchChatHistory', payload);
      let { chatId } = payload;
      // console.log(chatId);
      // console.log('rooms', rooms)
      let msgs = await chatService.getMsgs(chatId);
      let users = await chatService.getChatByChatId(chatId);
      socket.emit('getChatHistory', { users, msgs });
    } catch (err) {
      console.log(err.toString());
    }
  });
  socket.on('PM_guest', async (payload) => {
    try {
      console.log('=================== PM_guest: ', payload);
      // 依前端給予的變數抓取
      let { userId, guestUserId, chatId } = payload;
      // 依照user的動作更改命名
      let [sendUserId, popupUserId] = [guestUserId, userId];
      let sendUser = await chatService.getUserInfo(popupUserId, sendUserId);
      sendUser.chatId = chatId;
      let targetSocketIds = rooms[chatId].socketIds.filter((e) =>
        onlineUsers[popupUserId].includes(String(e))
      );
      console.log('=================== openGuestWindow:', targetSocketIds);
      targetSocketIds.forEach((e) => {
        // 改回前端命名方式
        io.to(e).emit('openGuestWindow', {
          userId: sendUserId,
          guestUser: sendUser
        });
      });
    } catch (err) {
      console.log(err.toString());
    }
  });
  socket.on('sendMessage', async (payload) => {
    try {
      console.log('=================== sendMessage', payload);
      let { message, chatId, userId } = payload;
      if (!userId || !chatId || !message) {
        console.log('sendMessage ERROR: No data to work');
        return;
      }
      // post msg in db
      await chatService.postMsg(userId, chatId, message);

      //TODO: 改用 socket 內建 room 功能傳事件
      console.log('message emit to room:', rooms[chatId].socketIds);
      rooms[chatId].socketIds.forEach((e) => {
        io.to(e).emit('replyMessage', payload);
      });
    } catch (err) {
      console.log(err.toString());
    }
  });
};

module.exports = chatSocket;
