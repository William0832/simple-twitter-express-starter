const chatService = require('../services/chatService')
const notificationService = require('../services/notificationServices')

module.exports = (io) => {
  let onlineUsers = {} // {1:[sk1,sk2,...], 2:[...],...}
  let rooms = {} // {1:{users:[1,2], sks:[sk1,sk2,s3...]}}

  io.on('connection', async (socket) => {
    console.log('==================== connected socket id :', socket.id)
    socket.on('disconnect', () => {
      console.log('====================disconnected socket id :', socket.id)
      //DONE! scan through user-socket link table , delete disconnected socket id
      Object.keys(onlineUsers).forEach((k) => {
        onlineUsers[k] = onlineUsers[k].filter((e) => e !== socket.id)
      })
      //DONE! if no more socket id under user , user set to offline
      Object.keys(onlineUsers).forEach((k) => {
        if (!onlineUsers[k].length) {
          console.log(`user:${k} is log out!`)
          //DONE! if no more socket id under user , user set to offline
          // TODO: check vue
          io.emit('userLogout', {
            userId: k,
            isOnline: false
          })
        }
      })
      console.log('disconnected', onlineUsers)
    })
    // login
    socket.on('login', async (myId) => {
      // DONE! push socket id in onlineUser socketIds
      if (!onlineUsers[myId]) {
        onlineUsers[myId] = []
      }
      onlineUsers[myId].push(socket.id)
      console.log('push socket in onlineUser!', onlineUsers)
      // DONE update user with db
      let user = {}
      let userDbInfo = await chatService.userOnline(myId)
      Object.keys(userDbInfo).forEach((k) => {
        user[k] = userDbInfo[k]
      })
    })

    socket.on('fetchOnlineUser', async (myId) => {
      try {
        console.log('====================fetchOnlineUser', myId)
        let showUserIds = []
        // get chats info from db
        let chats = await chatService.getChats(myId)
        // get other online user id list
        Object.keys(onlineUsers)
          .filter((k) => String(k) !== String(myId))
          .forEach((k) => {
            showUserIds.push(k)
          })
        // ========TEST=======
        // showUserIds = [2, 3, 20, 33, 19, 22, 35]
        // =======================
        // get other online user chat info
        if (showUserIds.length) {
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
              socket.emit('showChats', chat)
              console.log(chats)
              return
            }
          })
          // socket.emit('showChats', chats)
          return
        }
        console.log('only U is online!')
        socket.emit('fetchOnlineUser', chats)
      } catch (err) {
        console.log(err.toString())
      }
    })

    // invite user
    socket.on('inviteUser', async (payload) => {
      try {
        console.log('====================inviteUser', payload)
        let { invitedUserId, guestUser } = payload
        // ====TEST===
        // guestUser = 22
        // ===========
        let chat = await chatService.getChat(invitedUserId, guestUser)
        console.log('!!!!!', chat)
        // check chatId in chats ?
        if (!chat || !chat.chatId) {
          chat = await chatService.postChat(invitedUserId, guestUser)
          console.log('create', chat)
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
        console.log(chatId)
        rooms[chatId] = {
          users: [invitedUserId, guestUser],
          socketIds: temp
        }
        console.log(onlineUsers, '\n', rooms)
      } catch (err) {
        console.log(err)
      }
    })

    //ChatWindow.vue
    socket.on('fetchChatHistory', async (payload) => {
      console.log('====================chatId', payload)
      // payload = 25
      if (!Object.keys(rooms).includes(payload)) {
        console.log('chatId is not exist')
        return
      }
      let msgs = await chatService.getMsgs(payload)
      let users = await chatService.getChatByChatId(payload)
      console.log({ users, msgs })
      io.to(rooms[payload]).emit('fetchChatHistory', { users, msgs })
    })
    socket.on('sendMessage', (payload) => {
      const { message } = payload
      // const { chatId } = payload
      let chatId = 1
      io.to(rooms[chatId]).emit('sendMessage', payload)
      console.log('====================message', payload)
    })

    //alert
    socket.on('reply', async (payload) => {
      const { userId, tweetId, type } = payload
      console.log('reply notification')
      await notificationService.postNotification(userId, tweetId, type)

      io.emit('newReply')
    })

    socket.on('getNotifiations', async (userId) => {
      console.log('fetch notification')
      const notifications = await notificationService.getNotifications(userId)

      socket.emit('returnNotifications', notifications)
    })

    socket.on('getNotifiationCounts', async (userId) => {
      console.log('fetch notification counts,userId', userId)
      const counts = await notificationService.getNotificationCounts(userId)
      console.log('counts', counts)

      socket.emit('returnNotificationCounts', counts)
    })
  })
}
