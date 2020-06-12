const db = require('../models')
const sequelize = require('sequelize')
const Notification = db.Notification
const User = db.User
const Tweet = db.Tweet
const Like = db.Like
const helpers = require('../_helpers');

const notificationService = {

  getNotificationCounts: async (userId) => {
    try {
      let notifications = await Notification.findAll({
        where: { notifyUserId: userId, checked: false },
        attributes: ['id']
      })


      const count = notifications.length
      return count
    } catch (error) {
      console.error(error)
    }
  },

  getNotifications: async (userId) => {
    try {
      let notifications = await Notification.findAll({
        where: { notifyUserId: userId }
      })

      notifications = notifications.map(notification => {
        notification.update(
          { checked: true }
        )
        return notification.dataValues
      })

      return notifications
    } catch (error) {
      console.error(error)
    }
  },

  postNotification: async (userId, tweetId, type) => {
    try {
      let usersLikedTweet = await Like.findAll({
        where: { TweetId: tweetId },
        attributes: ['UserId'],
        include: [{ model: User, attributes: ['id', 'name'] }]
      })

      const postUser = await User.findByPk(userId, {
        attributes: ['name']
      })

      usersLikedTweet = usersLikedTweet.map(like => { return like.User.dataValues })

      usersLikedTweet.forEach(async function addNotification(user) {
        await Notification.create({
          postUserId: userId,
          notifyUserId: user.id,
          tweetId: tweetId,
          message: `${postUser.dataValues.name} had replied to tweet you liked!`,
          checked: false,
          type: type
        }
        )
      })
    } catch (error) {
      console.error(error)
    }
  },
}

module.exports = notificationService
