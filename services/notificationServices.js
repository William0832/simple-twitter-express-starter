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
      let usersLikedTweet = await Like.findAll({
        where: { TweetId: tweetId },
        attributes: ['UserId'],
        include: [{ model: User, attributes: ['id', 'name'] }]
      })

      console.log(usersLikedTweet[0].User.dataValues)

      usersLikedTweet = usersLikedTweet.map(like => { return like.User.dataValues })



      usersLikedTweet.forEach(async function addNotification(user) {

        // console.log(userId, id, tweetId, type)
        await Notification.create({
          postUserId: userId,
          notifyUserId: user.id,
          tweetId: tweetId,
          message: `${user.name} had replied to tweet you liked!`,
          checked: false,
          type: type
        }
        )
      })

      console.log(usersLikedTweet)
    } catch (error) {
      console.error(error)
    }
  },
}

module.exports = notificationService
