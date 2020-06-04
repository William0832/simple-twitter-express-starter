const db = require('../models')
const sequelize = require('sequelize')
const Notification = db.Notification
const User = db.User
const Tweet = db.Tweet
const Like = db.Like
const helpers = require('../_helpers');

const notificationService = {
  postNotification: async (userId, tweetId, type) => {
    try {
      const usersLikedTweet = await Like.findAll({
        where: { TweetId: tweetId },
        attributes: ['UserId']
      })

      console.log(usersLikedTweet)
    } catch (error) {
      console.error(error)
    }
  },
}

module.exports = notificationService
