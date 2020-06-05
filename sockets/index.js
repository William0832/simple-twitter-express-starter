// const chatController = require('./chat')
// const chatService = require('../services/chatService')
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
      msg: 'im 3',
      chatId: 2,
      time: t.addSeconds(15)
    },
    {
      id: 4,
      userId: 4,
      msg: 'im 4',
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
  let setChatId = 2
  io.on('connection', (socket) => {
    let socketId = socket.id
    // 監聽客戶登入
    socket.on('login', () => {
      console.log('======================================')
      console.log('user login')
      console.log('socketId = ', socketId)

      // write history msg
      console.log('==================================')
      console.log('寫入舊訊息', 'Room:', setChatId)
      historyMsg.forEach((m) => {
        if (m.chatId === setChatId) {
          console.log(m)
          socket.emit('talk', m)
        }
      })
      let userIfo = new Object()
      // userIfo.socketId = socketId
      // let n = Math.floor(Math.random() * users.length) + 1

      // userIfo.name = users[n].name
      // userIfo.isOnline = true
      // users[n] = userIfo
    })
    // 監聽客戶傳來的資料
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

    // socket.on('changeChat',()=>{

    // })

    // socket.on('logout', (userId) => {
    //   console.log('logout', userId)
    //   if (!connectedUser[userId]) {
    //     return
    //   } else {
    //     connectedUser[userId] = connectedUser[userId].filter(
    //       (id) => id !== socket.id
    //     )
    //   }
    //   console.log(connectedUser)
    // })

    // socket.on('invite', (invitation) => {
    //   const { user, invitedUser } = invitation
    //   console.log('id', socket.id, 'invite', invitedUser)
    //   let roomId = checkRooms(user, invitedUser)

    //   console.log(rooms, 'id', roomId)

    //   socket.join(roomId)

    //   if (connectedUser[invitedUser]) {
    //     connectedUser[invitedUser].forEach((id, index, object) => {
    //       if (io.sockets.connected[id]) {
    //         io.sockets.connected[id].join(roomId)
    //       } else {
    //         object.splice(index, 1) //remove unconnected socketId
    //       }
    //       console.log('id', connectedUser[invitedUser])
    //     })
    //   }
    // })

    // chatController(io, socket)
  })
}
