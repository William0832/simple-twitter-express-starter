const notificationService = require('../services/notificationServices')

module.exports = (io, socket) => {
  socket.on('reply', async (payload) => {
    const { userId, tweetId, type } = payload
    // console.log('reply notification')
    const notified = await notificationService.postReplyNotification(userId, tweetId, type)

    //only notify online users when new notification was added
    if (notified.status === 'success') {
      console.log("io.emit('newReply')")
      io.emit('newNotifications')
    }
  })

  socket.on('like', async (payload) => {
    const { userId, tweetId, type } = payload
    // console.log('reply notification')
    const notified = await notificationService.postLikeNotification(userId, tweetId, type)

    //only notify online users when new notification was added
    if (notified.status === 'success') {
      console.log("io.emit('newLike')")
      io.emit('newNotifications')
    }
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