// const notificationService = require('../services/notificationServices')
const chatSocket = require('./chat')
const notificationSocket = require('./notification')


module.exports = (io) => {
  let onlineUsers = {} // {1:[sk1,sk2,...], 2:[...],...}
  let rooms = {} // {1:{users:[1,2], sks:[sk1,sk2,s3...]}}

  io.on('connection', async (socket) => {
    console.log('==================== connected socket id :', socket.id)
    // chat
    chatSocket(io, socket, onlineUsers, rooms)

    //小鈴鐺
    notificationSocket(io, socket)
  })
}
