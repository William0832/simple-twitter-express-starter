const db = require('../models')
const sequelize = require('sequelize')
const Tweet = db.Tweet
const User = db.User
const Reply = db.Reply
const Like = db.Like
const helpers = require('../_helpers');

const tweetService = {
  getTweets: async (req, res, callback) => {

    try {
      const tweets = await Tweet.findAll({
        subQuery: false,
        raw: true,
        nest: true,
        order: [['createdAt', 'DESC']],
        group: ['Tweet.id'],
        include: [{ model: User, attributes: ['id', 'name', 'avatar'] },
        { model: Reply, as: 'Replies', attributes: [] },
        { model: Like, as: 'Likes', attributes: [] }],
        attributes: {
          include: [
            [sequelize.fn('COUNT', sequelize.col('Replies.id')), 'Replies_count'],
            [sequelize.fn('COUNT', sequelize.col('Likes.id')), 'Likes_count']
          ]
        },
      })

      let topUsers = await User.findAll({
        subQuery: false,
        include: [
          {
            model: User,
            as: 'Followers',
            attributes: []
          },
        ],
        group: ['User.id'],
        attributes: [
          'id', 'name', 'avatar', 'introduction',
          [sequelize.fn('COUNT', sequelize.col('Followers.id')), 'followers_count'],

        ],
        order: sequelize.literal('followers_count DESC'),
        limit: 10
      })

      topUsers = topUsers.map(user => ({
        ...user.dataValues,
        introduction: user.introduction.substring(0, 50)
      }))

      return callback({
        tweets,
        topUsers
      })
    } catch (error) {
      console.log(error)
    }


  },
  postTweets: async (req, res, callback) => {
    try {
      if (!req.body.description) {
        return callback({ status: 'error', message: "description didn't exist" })
      }

      if (req.body.description.length > 140) {
        return callback({ status: 'error', message: "description is too long" })
      }

      const tweet = await Tweet.create({
        description: req.body.description,
        UserId: helpers.getUser(req).id
      })

      return callback({ status: "success", message: 'tweet successfully posted.', tweet })
    }
    catch (error) {
      console.log(error);
    }
  }
}

module.exports = tweetService