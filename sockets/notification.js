const notificationService = require('../services/notificationServices')

module.exports = (io, socket) => {
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
}