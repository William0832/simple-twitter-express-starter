// const chatController = require('./chat')
const chatService = require('../services/chatService')
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
    socket.on('fetchOnlineUser', async (userId) => {
      try {
        console.log('====================fetchOnlineUser', userId)
        let showUseIds = []
        let chats = []
        Object.keys(onlineUsers)
          .filter((k) => k !== String(userId))
          .forEach((k) => {
            showUseIds.push(k)
          })
        // get chats from db
        if (!showUseIds.length) {
          console.log('only U is online!')
          let chats = await chatService.getChats(userId)
          console.log(chats)
        } else {
          console.log('do some thing else!')
        }
        // console.log(showUseIds)
        // show chat list - socket.emt to Vue
        socket.emit('showChats', chats)
      } catch (err) {
        console.log(err.toString())
      }
    })

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
      // try {
      //   if (!chat) return
      //   console.log(chat)
      // } catch (err) {
      //   console.log(err)
      // }
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
