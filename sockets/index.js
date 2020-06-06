// const chatController = require('./chat')
const chatService = require('../services/chatService')
Date.prototype.addSeconds = function (s) {
  let ms = s * 1000
  this.setTime(this.getTime() + ms)
  return this
}
module.exports = (io) => {
  let users = []
  let chats = [
    { chatId: 1, creator: 1, invitee: 2, socketIds: [] }, // [1,2]
    { chatId: 2, creator: 1, invitee: 3, socketIds: [] }, // [1,3]
    { chatId: 3, creator: 2, invitee: 4, socketIds: [] } // [2,4]
  ]
  let historyMsg = []
  let user = new Object()
  // 給定固定chat
  let setChatId = 0
  io.on('connection', (socket) => {
    console.log('====================connected socket id :', socket.id)

    socket.on('disconnect', () => {
      console.log('====================disconnected socket id :', socket.id)
      //TODO scan through user-socket link table , delete disconnected socket id
      //TODO if no more socket id under user , user set to offline
    })

    if (!setChatId) {
      // console.log('can pick an user to talk!')
    }
    // get socket.id
    let socketId = socket.id

    // login
    socket.on('login', async (user) => {
      console.log('====================login ID', userId)
      //TODO link user id with socket id

      // update data and isOnline!
      userInDb = await chatService.userOnline(user.id)
      Object.keys(userInDb).forEach((e) => {
        user[e] = userInDb[e]
      })
      // store socketId
      user.socketId = socketId
      // console.log('login user: ', user)

      // get chat list
      let chats = await chatService.getChats(user.id)
      // show chat list - socket.emt
      socket.emit('showChats', chats)
    })

    // invite user
    TODO: socket.on('invite', async (chatId) => {
      try {
        console.log(`socket.on get chatId:${chatId}`)
        // find the chatId in db
        let chat = await chatService.getChat(user.id, chatId)
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
    socket.on('talk', (data) => {
      // io 再傳給全部的客戶
      console.log('server 收到', data)
      // chat 不存在開新的chat
      if (!chats[data.chatId - 1]) {
        chats.push({
          id: chats.length + 1,
          socketIds: data.socketId
        })
        // 送出資訊
        chats[data.chatId - 1].socketIds.forEach((id) => {
          console.log(id)
          io.to(id).emit('talk', data)
        })
      }
      // 客戶在chat內
      if (!chats[data.chatId - 1].socketIds.includes(data.socketId)) {
        // 將客戶 socketId 存入對應的 chat 中
        chats[data.chatId - 1].socketIds.push(data.socketId)
      }
      console.log(chats)
      // 送出資訊
      chats[data.chatId - 1].socketIds.forEach((id) => {
        console.log(id)
        io.to(id).emit('talk', data)
      })
      // io.emit('talk', data)
    })

    //OnlineUser.vue
    socket.on('fetchOnlineUser', (userId) => {
      console.log('====================User', userId)
    })

    socket.on('inviteUser', (payload) => {
      console.log('====================inviteUser', payload)
    })
<<<<<<< HEAD
=======


    //ChatWindow.vue
    socket.on('fetchChatHistory', (payload) => {
      const { chatId } = payload
      console.log('====================chatId', chatId)
    })

    socket.on('sendMessage', (payload) => {
      const { message } = payload
      console.log('====================message', message)
    })
>>>>>>> origin/chat/jasper
  })
}
