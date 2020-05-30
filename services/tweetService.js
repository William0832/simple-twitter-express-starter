const db = require('../models')
const sequelize = require('sequelize')
const Tweet = db.Tweet
const User = db.User
const Reply = db.Reply
const Followship = db.Followship
const Like = db.Like
const helpers = require('../_helpers');

const tweetService = {
  getTweets: async (req, res, callback) => {

    try {
      let followedUser = await User.findByPk(helpers.getUser(req).id, {
        attributes: [],
        include: [
          {
            model: User,
            as: 'Followings',
            attributes: ['id']
          }
        ]
      })

      const followedUserId = followedUser.Followings.map(user => user.id)

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
        introduction: user.introduction.substring(0, 50),
        isFollowed: followedUserId.includes(user.id) ? true : false
      }))

      let likedTweets = await Like.findAll({
        where: { 'UserId': helpers.getUser(req).id },
        attributes: ['TweetId']
      })

      likedTweets = likedTweets.map(like => like.TweetId)

      let tweets = await Tweet.findAll({
        subQuery: false,
        raw: true,
        nest: true,
        order: [['createdAt', 'DESC']],
        group: ['Tweet.id'],
        include: [{ model: User, attributes: ['id', 'name', 'avatar'] },
        { model: Reply, as: 'Replies', attributes: [] },
        { model: Like, as: 'Likes', attributes: ['UserId'] }],
        attributes: {
          include: [
            [sequelize.fn('COUNT', sequelize.col('Replies.id')), 'Replies_count'],
            [sequelize.fn('COUNT', sequelize.col('Likes.id')), 'Likes_count']
          ]
        },
      })

      tweets = tweets.map(tweet => ({
        ...tweet,
        isLiked: likedTweets.includes(tweet.id) ? true : false
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
  },
  getTweet: async (req, res, callback) => {

    try {
      const tweet = await Tweet.findByPk(req.params.tweet_id, {
        attributes: ['id', 'description', 'createdAt'],
        include: [{ model: User, attributes: ['id', 'name', 'avatar'] }]
      })

      if (tweet) {
        return callback({
          tweet
        })
      } else {
        return callback({
          status: 'error',
          message: 'target tweet didn\'t exist!'
        })
      }


    } catch (error) {
      console.log(error)
    }


  }
}

module.exports = tweetService