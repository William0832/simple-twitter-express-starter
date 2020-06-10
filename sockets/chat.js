const chatService = require('../services/chatService')

const chatSocket = (io, socket, onlineUsers, rooms) => {
  socket.on('disconnect', () => {
    console.log('====================disconnected socket id :', socket.id)
    // TODO: refactor by Object.entries(Obj)
    Object.keys(onlineUsers).forEach(async (k) => {
      onlineUsers[k] = onlineUsers[k].filter((e) => e !== socket.id)
      //if no more socket id under user , user set to offline
      if (!onlineUsers[k][0]) {
        console.log(`user:${k} is log out!`)
        // update db state
        await chatService.userOffline(k)
        // TODO: add socket.on event in Vue: updateOnlineState
        // 1. after user click chat tab
        // 2. 暫定直接消失
        io.emit('updateOnlineState', {
          userId: k,
          isOnline: false
        })
      }
    })
    console.log('disconnected', onlineUsers)
  })
  socket.on('login', async (userId) => {
    // push socket id in onlineUser socketIds
    onlineUsers[userId] = onlineUsers[userId] || []
    onlineUsers[userId].push(socket.id)
    console.log('push socket in onlineUser!', onlineUsers)
    // update user state in db
    await chatService.userOnline(userId)
    io.emit('updateOnlineState', {
      userId: userId,
      isOnline: true
    })
  })
  socket.on('logout', async (userId) => {
    console.log('========================logout userId:', userId)
    // clean socketsId
    onlineUsers[userId] = []
    console.log('========================onlineUsers', onlineUsers)

    // update db
    await chatService.userOffline(userId)
    io.emit('updateOnlineState', {
      userId,
      isOnline: false
    })
  })
  socket.on('fetchOnlineUser', async (myId) => {
    try {
      console.log('==================== fetchOnlineUser', myId)
      // get history chats info from db
      let historyChats = await chatService.getChats(myId)
      let userOfHistoryChats = historyChats.map((e) => String(e.userId))
      // get other online user id list
      let elseOnlineUsers = Object.keys(onlineUsers).filter((e) => {
        return onlineUsers[e][0] && e !== String(myId)
      })
      // ======== TEST =======
      // elseOnlineUsers = ['2', '3']
      // =======================

      // console.log('elseOnlineUsers:', elseOnlineUsers)
      // console.log('userOfHistoryChats', userOfHistoryChats)

      // get other online user chat info
      if (elseOnlineUsers[0]) {
        // compare user is in the chat
        let hasChatUsers = elseOnlineUsers.filter((e) =>
          userOfHistoryChats.includes(e)
        )
        let noChatUsers = elseOnlineUsers.filter(
          (e) => hasChatUsers.indexOf(e) === -1
        )
        displayChats = historyChats.filter((e) =>
          hasChatUsers.includes(String(e.userId))
        )

        console.log('Has chat Users', hasChatUsers)
        console.log('No chat users', noChatUsers)

        // add noChatUsers info
        if (noChatUsers[0]) {
          noChatUsers.forEach(async (e, index) => {
            try {
              let newChat = await chatService.getNewUser(e)
              newChat.chatId = null
              displayChats.push(newChat)
              if (index + 1 === noChatUsers.length) {
                console.log('some chatId is null')
                socket.emit('getOnlineUser', displayChats)
                return
              }
            } catch (err) {
              console.log(err.toString())
            }
          })
          return
        }
        console.log('all chat have chatId!')
        socket.emit('getOnlineUser', displayChats)
        return
      }
      console.log('only U is online! display history chats')
      socket.emit('getOnlineUser', historyChats)
    } catch (err) {
      console.log(err.toString())
    }
  })
  socket.on('inviteUser', async (payload) => {
    try {
      console.log('====================inviteUser', payload)
      let { invitedUserId, guestUser } = payload
      // ====TEST===
      // guestUser = 22
      // ===========
      let chat = await chatService.getChat(invitedUserId, guestUser)
      // check chatId in chats ?
      if (!chat || !chat.chatId) {
        chat = await chatService.postChat(invitedUserId, guestUser)
        console.log('create new chatId', chat)
      }
      let chatId = chat.chatId
      // set socket room
      // get onlineUser socketIds(no socketIds still Ok!)

      let temp = []
      let ids = [invitedUserId, guestUser]
      ids.forEach((i) => {
        onlineUsers[i] = onlineUsers[i] || []
        onlineUsers[i].forEach((e) => {
          temp.push(e)
        })
      })
      rooms[chatId] = {
        users: [invitedUserId, guestUser],
        socketIds: temp
      }
      console.log('onlineUsers:', onlineUsers)
      console.log('room', rooms[chatId])
      socket.emit('getChatId', { chatId })
    } catch (err) {
      console.log(err.toString())
    }
  })
  socket.on('fetchChatHistory', async (payload) => {
    try {
      console.log('=================== fetchChatHistory', payload)
      let { chatId } = payload
      // console.log('rooms', rooms)
      let msgs = await chatService.getMsgs(chatId)
      let users = await chatService.getChatByChatId(chatId)
      // console.log('users', users)
      socket.emit('getChatHistory', { users, msgs })
    } catch (err) {
      console.log(err.toString())
    }
  })
  socket.on('PM_guest', async (payload) => {
    try {
      console.log('=================== PM_guest: ', payload)
      let { userId, guestUserId, chatId } = payload
      // 依照user的動作更改命名
      let [sendUserId, popupUserId] = [guestUserId, userId]
      let sendUser = await chatService.getNewUser(sendUserId)
      sendUser.chatId = chatId
      let targetSocketIds = rooms[chatId].socketIds.filter((e) =>
        onlineUsers[popupUserId].includes(String(e))
      )
      console.log('=================== openGuestWindow:', targetSocketIds)
      targetSocketIds.forEach((e) => {
        // 改回命名方式
        io.to(e).emit('openGuestWindow', {
          userId: sendUserId,
          guestUser: sendUser
        })
      })
    } catch (err) {
      console.log(err.toString())
    }
  })
  socket.on('sendMessage', async (payload) => {
    try {
      console.log('=================== sendMessage', payload)
      let { message, chatId, userId } = payload
      if (!userId || !chatId || !message) {
        console.log('sendMessage ERROR: No data to work')
        return
      }
      // post msg in db
      await chatService.postMsg(userId, chatId, message)

      //TODO: 改用 socket 內建 room 功能傳事件
      console.log('message emit to room:', rooms[chatId].socketIds)
      rooms[chatId].socketIds.forEach((e) => {
        io.to(e).emit('replyMessage', payload)
      })
    } catch (err) {
      console.log(err.toString())
    }
  })
}

module.exports = chatSocket
