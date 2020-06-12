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
        where: { notifyUserId: userId },
        order: [['createdAt', 'DESC']]
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

  postReplyNotification: async (userId, tweetId, type) => {
    try {

      let newNotifications = false

      //fetch user name who activated notification 
      const postUser = await User.findByPk(userId, {
        attributes: ['name']
      })


      //notify tweet's publisher
      const RepliedTweet = await Tweet.findByPk(tweetId, {
        attributes: ['UserId']
      })

      const repliedTweetUserId = RepliedTweet.dataValues.UserId


      //prevent user to notify themselves with their own action
      if (repliedTweetUserId && repliedTweetUserId !== userId) {
        await Notification.create({
          postUserId: userId,
          notifyUserId: repliedTweetUserId,
          tweetId: tweetId,
          message: `${postUser.dataValues.name} had replied your tweet!`,
          checked: false,
          type: type
        })


        newNotifications = true
      }

      // notify users who liked this tweet
      let usersLikedTweet = await Like.findAll({
        where: { TweetId: tweetId },
        attributes: ['UserId'],
        include: [{ model: User, attributes: ['id', 'name'] }]
      })


      usersLikedTweet = usersLikedTweet
        .map(like => { return like.User.dataValues })
        .filter(user => user.id !== userId) //Prevent current user to notify themselves


      if (usersLikedTweet.length) {
        usersLikedTweet.forEach(async function addNotification(user) {
          await Notification.create({
            postUserId: userId,
            notifyUserId: user.id,
            tweetId: tweetId,
            message: `${postUser.dataValues.name} had replied a tweet you liked!`,
            checked: false,
            type: type
          })
        })

        newNotifications = true
      }

      if (newNotifications) {
        return { status: 'success' }
      }

      return { status: 'empty' } //no notification added
    } catch (error) {
      console.error(error)
    }
  },

  postLikeNotification: async (userId, tweetId, type) => {
    try {

      const LikedTweet = await Tweet.findByPk(tweetId, {
        attributes: ['UserId']
      })

      const postUser = await User.findByPk(userId, {
        attributes: ['name']
      })

      const notifyUserId = LikedTweet.dataValues.UserId

      console.log(notifyUserId)

      //prevent user to notify themselves with their own action
      if (notifyUserId && notifyUserId !== userId) {
        await Notification.create({
          postUserId: userId,
          notifyUserId: notifyUserId,
          tweetId: tweetId,
          message: `${postUser.dataValues.name} had liked your tweet!`,
          checked: false,
          type: type
        })


        return { status: 'success' }
      }

      return { status: 'empty' } //no notification added
    } catch (error) {
      console.error(error)
    }
  },
}

module.exports = notificationService
