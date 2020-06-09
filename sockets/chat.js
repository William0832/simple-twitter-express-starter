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
      console.log('====================fetchOnlineUser', myId)
      // get history chats info from db
      let chats = await chatService.getChats(myId)
      // get other online user id list
      let elseOnlineUsers = Object.keys(onlineUsers).filter(
        (e) => onlineUsers[e][0] && e !== String(myId)
      )
      console.log('elseOnlineUsers:', elseOnlineUsers)
      console.log(
        'chats userIds',
        chats.map((e) => e.userId)
      )
      // ========TEST=======
      // elseOnline8Users = ['2', '3', '6', '11']
      // =======================
      // FIXME: 多人再線的狀態，會判斷部分已存在的chatId = null
      // get other online user chat info
      if (elseOnlineUsers[0]) {
        // compare user is in the chat
        let hasChatUsers = []
        chats.forEach((e) => {
          if (elseOnlineUsers.includes(String(e.chatId))) {
            hasChatUsers.push(String(e.chatId))
          }
        })
        let noChatUsers = elseOnlineUsers.filter(
          (e) => hasChatUsers.indexOf(e) === -1
        )
        chats = chats.filter((e) => hasChatUsers.includes(String(e.userId)))
        console.log('Has chat Users', hasChatUsers)
        console.log('No chat users', noChatUsers)
        // add noChatUsers info
        noChatUsers.forEach(async (e, index) => {
          let newChat = await chatService.getNewUser(e)
          newChat.chatId = null
          chats.push(newChat)
          if (index + 1 === noChatUsers.length) {
            socket.emit('getOnlineUser', chats)
            console.log('getOnlineUser', chats)
            return
          }
        })
        socket.emit('getOnlineUser', chats)
        return
      }
      console.log('only U is online! display history chats')
      socket.emit('getOnlineUser', chats)
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

      // FIXME: add socket.on event in Vue: getChatId 是假的~
      // (new user to chat)
      socket.emit('getChatId', { chatId })
    } catch (err) {
      console.log(err.toString())
    }
  })
  socket.on('fetchChatHistory', async (payload) => {
    try {
      console.log('====================chatId', payload)
      let { chatId } = payload
      console.log('rooms', rooms)
      let msgs = await chatService.getMsgs(chatId)
      let users = await chatService.getChatByChatId(chatId)
      console.log('users', users)
      socket.emit('getChatHistory', { users, msgs })
    } catch (err) {
      console.log(err.toString())
    }
  })
  socket.on('PM_guest', async (payload) => {
    try {
      console.log('===================PM_guest_users: ', payload)
      let { userId, guestUserId, chatId } = payload
      if (!userId || !guestUserId) {
        console.log('PM_guest ERROR: No data to work')
        return
      }
      // const chat = await chatService.getChat(, guestUserId)
      // const { chatId } = chat
      let guestUser = await chatService.getNewUser(guestUserId)
      let targetSocketIds = rooms[chatId].socketIds.filter((e) =>
        onlineUsers[guestUserId].includes(String(e))
      )
      console.log('========openGuestWindow:', targetSocketIds)
      targetSocketIds.forEach((e) => {
        io.to(e).emit('openGuestWindow', { userId, guestUser })
      })
    } catch (err) {
      console.log(err.toString())
    }
  })
  socket.on('sendMessage', async (payload) => {
    try {
      console.log('====================sendMessage', payload)
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
