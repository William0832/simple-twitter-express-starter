const db = require('../models')
const sequelize = require('sequelize')
const Like = db.Like
const User = db.User
const Tweet = db.Tweet
const helpers = require('../_helpers');

const likeService = {
  like: async (req, res, callback) => {
    try {
      const userId = helpers.getUser(req).id
      const tweetId = req.body.id
      const tweet = await Tweet.findByPk(tweetId, {
        attributes: ['id']
      })

      if (!tweet) {
        return callback({ status: 'error', message: 'This tweet doesn\'t exist.' })
      }

      let likedUsers = Tweet.findByPk(tweetId, {
        include: [{ model: User, as: 'likedUsers', attributes: ['id'] }]
      })

      let userList = likedUsers.map(user => user.id.toString())

      if (!userList.includes(userId)) {
        console.log('user liked this tweet')
        const like = await Like.create({
          UserId: userId,
          TweetId: tweetId
        })

        return callback({
          like
        })
      }
      else {
        return callback({ status: 'error', message: "User has already liked this tweet." })
      }
    } catch (error) {
      console.log(error)
    }
  },
  unlike: async (req, res, callback) => {
    try {
      const like = await Like.destroy(
        {
          where: {
            UserId: helpers.getUser(req).id,
            TweetId: req.params.id
          }
        }
      )
      if (like) {
        return callback({ status: "success", message: "", like })
      }
      else {
        return callback({ status: "error", message: "User didn\'t liked this tweet" })
      }
    } catch (error) {
      console.log(error)
    }
  },
}

module.exports = likeService