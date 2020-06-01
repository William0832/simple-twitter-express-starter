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
      const tweetId = req.params.id
      const tweet = await Tweet.findByPk(tweetId, {
        attributes: ['id']
      })

      if (!tweet) {
        return callback({ status: 'error', message: 'This tweet doesn\'t exist.' })
      }

      // 找Like資料庫有沒有該筆tweetId 與 userId
      let likedTweet = await Like.findOne({ where: { TweetId: tweetId, UserId: userId }   })

      // 如果有，代表User已按like，如果沒有，就新增一筆Like紀錄
      if(likedTweet){
        return callback({ status: 'error', message: "User has already liked this tweet." })
      } else {
        console.log('user likes this tweet!')

        const like = await Like.create({
          UserId: userId,
          TweetId: tweetId
        })

        return callback({ status: "success", message: "", like })
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