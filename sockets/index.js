const notificationService = require('../services/notificationServices')
const chatSocket = require('./chat')
module.exports = (io) => {
  let onlineUsers = {} // {1:[sk1,sk2,...], 2:[...],...}
  let rooms = {} // {1:{users:[1,2], sks:[sk1,sk2,s3...]}}

  io.on('connection', async (socket) => {
    console.log('==================== connected socket id :', socket.id)
    // chat
    chatSocket(io, socket, onlineUsers, rooms)

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
