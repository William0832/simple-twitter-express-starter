const chatService = require('../services/chatService')
const notificationService = require('../services/notificationServices')

module.exports = (io) => {
  let onlineUsers = {} // {1:[sk1,sk2,...], 2:[...],...}
  let rooms = {} // {1:{users:[1,2], sks:[sk1,sk2,s3...]}}

  io.on('connection', async (socket) => {
    console.log('==================== connected socket id :', socket.id)
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
          // (after user click chat tab)
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
      if (!onlineUsers[userId]) {
        onlineUsers[userId] = []
      }
      onlineUsers[userId].push(socket.id)
      console.log('push socket in onlineUser!', onlineUsers)
      // update user state in db
      await chatService.userOnline(userId)
      // TODO: add socket.on event in Vue: updateOnlineState
      // (after user click chat tab)
      io.emit('updateOnlineState', {
        userId: userId,
        isOnline: true
      })
    })
    // FIXME:  disconnect issue: add logout socket.emit event from Vue
    socket.on('logout', async (userId) => {
      // clean socketsId
      onlineUsers[userId] = []
      // update db
      await chatService.userOffline(userId)
      // TODO: add socket.on event in Vue: updateOnlineState
      // (after user click chat tab)
      io.emit('updateOnlineState', {
        userId,
        isOnline: false
      })
    })

    // chat
    socket.on('fetchOnlineUser', async (myId) => {
      try {
        console.log('====================fetchOnlineUser', myId)
        // get chats info from db
        let chats = await chatService.getChats(myId)
        // get other online user id list
        let showUserIds = Object.keys(onlineUsers).filter(
          (k) => String(k) !== String(myId)
        )
        // ========TEST=======
        // showUserIds = [2, 3, 20, 33, 19, 22, 35]
        // =======================
        // get other online user chat info
        if (showUserIds[0]) {
          // compare user is in the chat
          chats = chats.filter((c) => showUserIds.includes(c.userId))
          let temp = chats.map((c) => c.userId)
          let notInChatsId = showUserIds.filter((e) => temp.indexOf(e) === -1)
          console.log('no chatId users', notInChatsId)
          // get final id
          notInChatsId.forEach(async (e, index) => {
            let chat = await chatService.getNewUser(e)
            chat.chatId = null
            chats.push(chat)
            if (index + 1 === notInChatsId.length) {
              socket.emit('getOnlineUser', chats)
              console.log(chats)
              return
            }
          })
          // socket.emit('showChats', chats)
          return
        }
        console.log('only U is online!')
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
        // console.log('!!!!!', chat)
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
          if (!onlineUsers[i]) {
            onlineUsers[i] = []
          }
          onlineUsers[i].forEach((e) => {
            temp.push(e)
          })
        })
        rooms[chatId] = {
          users: [invitedUserId, guestUser],
          socketIds: temp
        }
        console.log('onlineUsers:', onlineUsers)
        console.log('rooms', rooms)

        // TODO: add socket.on event in Vue: getChatId
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
        // payload = 25
        console.log('rooms', rooms)
        // TODO: 正常不會發生，在fetchOnlineUser & inviteUser 都給了
        // if (!Object.keys(rooms).includes(String(chatId))) {
        //   console.log(`chatId:${chatId} is not exist!!!!!!!!!!!!`)
        //   return
        // }
        let msgs = await chatService.getMsgs(chatId)
        let users = await chatService.getChatByChatId(chatId)
        console.log(msgs)
        socket.emit('getChatHistory', { users, msgs })
      } catch (err) {
        console.log(err.toString())
      }
    })

    socket.on('sendMessage', async (payload) => {
      try {
        console.log('====================sendMessage', payload)
        let { message, chatId, userId } = payload
        // console.log(userId, chatId, message)
        if (!userId || !chatId || !message) {
          console.log('sendMessage ERROR: No data to work')
          return
        }
        await chatService.postMsg(userId, chatId, message)
        io.to(rooms[chatId]).emit('replyMessage', payload)
        console.log('====================message', payload)
      } catch (err) {
        console.log(err.toString())
      }
    })

    //小鈴鐺
    socket.on('reply', async (payload) => {
      const { userId, tweetId, type } = payload
      // console.log('reply notification')
      await notificationService.postNotification(userId, tweetId, type)

      io.emit('newReply')
    })
    socket.on('getNotifiations', async (userId) => {
      // console.log('fetch notification')
      const notifications = await notificationService.getNotifications(userId)
      socket.emit('returnNotifications', notifications)
    })
    socket.on('getNotifiationCounts', async (userId) => {
      // console.log('fetch notification counts,userId', userId)
      const counts = await notificationService.getNotificationCounts(userId)
      // console.log('counts', counts)
      socket.emit('returnNotificationCounts', counts)
    })
  })
}
