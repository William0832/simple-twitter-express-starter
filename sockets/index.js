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
      onlineUsers[userId] = onlineUsers[userId] || []
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
    // disconnect issue: add logout socket.emit event from Vue
    socket.on('logout', async (userId) => {
      console.log('========================logout userId:', userId)
      // clean socketsId
      onlineUsers[userId] = []
      console.log('========================onlineUsers', onlineUsers)

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
        // get history chats info from db
        let chats = await chatService.getChats(myId)
        // get other online user id list
        let elseOnlineUsers = Object.keys(onlineUsers).filter(
          (e) => onlineUsers[e][0] && e !== String(myId)
        )
        console.log('elseOnlineUsers:', elseOnlineUsers)
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
        console.log('rooms', rooms)
        // TODO: 正常不會發生，在fetchOnlineUser & inviteUser 都給了
        // if (!Object.keys(rooms).includes(String(chatId))) {
        //   console.log(`chatId:${chatId} is not exist!!!!!!!!!!!!`)
        //   return
        // }
        let msgs = await chatService.getMsgs(chatId)
        let users = await chatService.getChatByChatId(chatId)
        // console.log('history msg:', msgs)
        socket.emit('getChatHistory', { users, msgs })
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

        //TODO: 改用 socket room 功能
        console.log('message emit to room:', rooms[chatId].socketIds)
        rooms[chatId].socketIds.forEach((e) => {
          io.to(e).emit('replyMessage', payload)
        })
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
