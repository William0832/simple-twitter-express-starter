const chatService = require('../services/chatService')
const notificationService = require('../services/notificationServices')

Date.prototype.addSeconds = function (s) {
  let ms = s * 1000
  this.setTime(this.getTime() + ms)
  return this
}

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
    // TODO:
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
        // TODO: f-test
        showUserIds = [2, 4, 3, 16]
        // get other online user chat info
        if (showUserIds.length) {
          // compare user is in the chat
          chats = chats.filter((c) => showUserIds.includes(c.userId))
          let temp = chats.map((c) => c.userId)
          let notInChatsId = showUserIds.filter((e) => temp.indexOf(e) === -1)
          console.log('ready to creat chat with these ids:', notInChatsId)
          // get final id
          notInChatsId.forEach(async (e) => {
            // creat a chat in db
            console.log('create chat!')
            let chat = await chatService.postChat(myId, e)
            console.log('new chat: ', chat)
            chats.push(chat)
          })
          console.log(chats)
          socket.emit('showChats', chats)
          return
        }
        console.log('only U is online!')
        socket.emit('showChats', chats)
      } catch (err) {
        console.log(err.toString())
      }
    })

    // invite user
    // TODO:
    socket.on('inviteUser', async (payload) => {
      console.log('====================inviteUser', payload)
      // check chatId in chats ?
      // -- in:
      // ---- check guest isOnline ?
      // ------ onLine:
      // -------- 1.add guest's socket-id to chat
      // TODO:
      // -------- 2.ready to get history msg and talk!
      // ------ offLine:
      // -------- 1.get history msg and talk!
      // -- out:
      // ----
      // try {
      //   if (!chat) return
      //   console.log(chat)
      // } catch (err) {
      //   console.log(err)
      // }
    })

    //ChatWindow.vue
    socket.on('fetchChatHistory', (payload) => {
      const { chatId } = payload
      console.log('====================chatId', chatId)
    })
    socket.on('sendMessage', (payload) => {
      const { message } = payload
      console.log('====================message', message)
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
      console.log('fetch notification counts')
      const counts = await notificationService.getNotificationCounts(userId)

      socket.emit('returnNotificationCounts', counts)
    })
  })
}
