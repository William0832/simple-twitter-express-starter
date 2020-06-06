// const chatController = require('./chat')
const chatService = require('../services/chatService')
Date.prototype.addSeconds = function (s) {
  let ms = s * 1000
  this.setTime(this.getTime() + ms)
  return this
}
module.exports = (io) => {
  let onlineUsers = []
  let chats = []

  io.on('connection', (socket) => {
    console.log('==================== connected socket id :', socket.id)
    socket.on('disconnect', () => {
      console.log('====================disconnected socket id :', socket.id)
      //TODO scan through user-socket link table , delete disconnected socket id
      //TODO if no more socket id under user , user set to offline
    })
    // get socket.id
    let socketId = socket.id
    // login
    socket.on('login', async (myId) => {
      let user = {}
      // push socket id in user's socketIds
      user.socketIds = []
      user.socketIds.push(socketId)
      // update user with db
      userDbInfo = await chatService.userOnline(myId)
      Object.keys(userDbInfo).forEach((e) => {
        user[e] = userDbInfo[e]
      })
      // add use in onlineUsers (by some conditions)
      if (!onLineUsers.length) {
        onLineUsers.forEach((e) => {
          if (e.id !== user.id) {
            onLineUsers.push(user)
          }
        })
      } else {
        onLineUsers.push(user)
      }
      // add user's chat list, find in db
      chats = await chatService.getChats(user.id)
    })
    // check if out of socket function still got user and chats
    console.log('==========================\n', 'login users: \n', onlineUsers)
    console.log('==========================\nchats:\n', chats)

    //OnlineUser.vue
    // TODO:
    socket.on('fetchOnlineUser', (userId) => {
      console.log('====================User', userId)
      onLineUsersEsp = onLineUsers.map((e) => e.id !== userId)
    })

    // show chat list - socket.emt to Vue
    socket.emit('showChats', chats)

    // invite user
    // TODO:
    socket.on('inviteUser', async (chatId) => {
      console.log('====================inviteUser', chatId)
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
      try {
        console.log(chat)
      } catch (err) {
        console.log(err)
      }
    })

    // et history msg
    // historyMsg.forEach((m) => {
    //   if (m.chatId === setChatId) {
    //     console.log(m)
    //     socket.emit('talk', m)
    //   }
    // })

    // talk
    // socket.on('talk', (data) => {
    //   // io 再傳給全部的客戶
    //   console.log('server 收到', data)
    //   // chat 不存在開新的chat
    //   if (!chats[data.chatId - 1]) {
    //     chats.push({
    //       id: chats.length + 1,
    //       socketIds: data.socketId
    //     })
    //     // 送出資訊
    //     chats[data.chatId - 1].socketIds.forEach((id) => {
    //       console.log(id)
    //       io.to(id).emit('talk', data)
    //     })
    //   }
    //   // 客戶在chat內
    //   if (!chats[data.chatId - 1].socketIds.includes(data.socketId)) {
    //     // 將客戶 socketId 存入對應的 chat 中
    //     chats[data.chatId - 1].socketIds.push(data.socketId)
    //   }
    //   console.log(chats)
    //   // 送出資訊
    //   chats[data.chatId - 1].socketIds.forEach((id) => {
    //     console.log(id)
    //     io.to(id).emit('talk', data)
    //   })
    //   // io.emit('talk', data)
    // })

    // //OnlineUser.vue
    // socket.on('fetchOnlineUser', (userId) => {
    //   console.log('====================User', userId)
    // })

    // socket.on('inviteUser', (payload) => {
    //   console.log('====================inviteUser', payload)
    // })

    //ChatWindow.vue
    socket.on('fetchChatHistory', (payload) => {
      const { chatId } = payload
      console.log('====================chatId', chatId)
    })

    socket.on('sendMessage', (payload) => {
      const { message } = payload
      console.log('====================message', message)
    })
  })
}
