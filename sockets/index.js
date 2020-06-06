// const chatController = require('./chat')
const chatService = require('../services/chatService')
Date.prototype.addSeconds = function (s) {
  let ms = s * 1000
  this.setTime(this.getTime() + ms)
  return this
}
module.exports = (io) => {
  let users = [
    { name: 'a', userId: 1 },
    { name: 'b', userId: 2 },
    { name: 'c', userId: 3 },
    { name: 'd', userId: 4 }
  ]
  let chats = [
    { chatId: 1, creator: 1, invitee: 2, socketIds: [] }, // [1,2]
    { chatId: 2, creator: 1, invitee: 3, socketIds: [] }, // [1,3]
    { chatId: 3, creator: 2, invitee: 4, socketIds: [] } // [2,4]
  ]
  let t = new Date()
  let historyMsg = [
    { id: 1, userId: 1, msg: 'i am 1', chatId: 1, time: t },
    { id: 2, userId: 2, msg: 'i am 2', chatId: 2, time: t.addSeconds(5) },
    {
      id: 3,
      userId: 3,
      msg: 'i am 3',
      chatId: 2,
      time: t.addSeconds(15)
    },
    {
      id: 4,
      userId: 4,
      msg: 'i am 4',
      chatId: 3,
      time: t.addSeconds(25)
    },
    {
      id: 5,
      userId: 1,
      msg: 'im 1',
      chatId: 1,
      time: t.addSeconds(5)
    }
  ]
  // 給定固定chat
  let setChatId = 0
  io.on('connection', (socket) => {
    if (!setChatId) {
      console.log('can pick an user to talk!')
    }
    // get socket.id
    let socketId = socket.id

    // login
    socket.on('login', async (user) => {
      // update isOnline
      user = await chatService.userOnline(user.id)
      // store socketId
      user.socketId = socketId
      // console.log('login user: ', user)

      // get chat list
      let chats = await chatService.getChats(user.id)
      // show chat list - socket.emt
      socket.emit('showChats', chats)
    })
    // invite user
    TODO: socket.on('invite', (invitee) => {
      // console.log(`invite user:${invitee}`)
      // find the chatId in db
      // let chat = chatService.getChat(myId, invitee, (data) => data)
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
      console.log('User', userId)
    })

    socket.on('inviteUser', (payload) => {
      console.log('inviteUser', payload)
    })

  })
}
