const db = require('../models')
const sequelize = require('sequelize')
const Tweet = db.Tweet
const User = db.User
const Reply = db.Reply
const Like = db.Like

const tweetService = {
  getTweets: async (req, res, callback) => {

    try {
      const tweets = await Tweet.findAll({
        subQuery: false,
        raw: true,
        nest: true,
        order: [['createdAt', 'DESC']],
        group: ['Tweet.id'],
        include: [{ model: User, attributes: ['name'] },
        { model: Reply, as: 'Replies', attributes: [] },
        { model: Like, as: 'Likes', attributes: [] }],
        attributes: {
          include: [
            [sequelize.fn('COUNT', sequelize.col('Replies.id')), 'Replies_count'],
            [sequelize.fn('COUNT', sequelize.col('Likes.id')), 'Likes_count']
          ]
        },
      })

      return callback({
        tweets
      })
    } catch (error) {
      console.log(error)
    }


  },
    })
  }
}

module.exports = tweetService