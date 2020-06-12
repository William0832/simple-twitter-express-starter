const db = require('../models')
const sequelize = require('sequelize')
const Tweet = db.Tweet
const User = db.User
const Reply = db.Reply
const Followship = db.Followship
const Like = db.Like
const helpers = require('../_helpers')

const removeKeys = (data, keys) => {
  if (Object.keys(data).includes(...keys)) {
    keys.forEach((k) => {
      delete data[k]
    })
  } else {
    data.forEach((d) => {
      keys.forEach((k) => {
        delete d[k]
      })
    })
  }
}

const tweetService = {
  getTweets: async (req, res, callback) => {
    try {
      let likedTweets = await Like.findAll({
        where: { UserId: helpers.getUser(req).id },
        attributes: ['TweetId']
      })

      likedTweets = likedTweets.map((like) => like.TweetId)

      console.log("req.query.offset", req.query.offset)
      console.log("req.query.limit", req.query.limit)
      let offset = Number(req.query.offset) || 0
      let loadLimit = Number(req.query.limit) || 5

      let tweets = await Tweet.findAndCountAll({
        include: [
          { model: User, attributes: ['id', 'email', 'name', 'avatar'] },
          { model: Reply, attributes: ['id', 'UserId'] },
          { model: Like, attributes: ['id', 'UserId'] }
        ],
        order: [['createdAt', 'DESC'], ['id', 'ASC']],
        offset: offset,
        limit: loadLimit
      })

      tweets = tweets.rows.map((tweet) => ({
        ...tweet.dataValues,
        repliesCount: tweet.Replies.length || 0,
        likesCount: tweet.Likes.length || 0,
        isLiked: likedTweets.includes(tweet.id) ? true : false
      }))
      removeKeys(tweets, ['Replies', 'Likes'])

      return callback({
        tweets
      })
    } catch (error) {
      console.log(error)
    }
  },
  getTopUsers: async (req, res, callback) => {
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

      const followedUserId = followedUser.Followings.map((user) => user.id)

      let topUsers = await User.findAll({
        subQuery: false,
        include: [
          {
            model: User,
            as: 'Followers',
            attributes: []
          }
        ],
        group: ['User.id'],
        attributes: [
          'id',
          'name',
          'avatar',
          'introduction',
          [
            sequelize.fn('COUNT', sequelize.col('Followers.id')),
            'followers_count'
          ]
        ],
        order: sequelize.literal('followers_count DESC'),
        limit: 10
      })

      topUsers = topUsers.map((user) => ({
        ...user.dataValues,
        introduction: user.introduction
          ? user.introduction.substring(0, 50)
          : null,
        isFollowed: followedUserId.includes(user.id) ? true : false
      }))


      return callback({
        topUsers
      })
    } catch (error) {
      console.log(error)
    }
  },
  postTweets: async (req, res, callback) => {
    try {
      if (!req.body.description) {
        return callback({
          status: 'error',
          message: "description didn't exist"
        })
      }

      if (req.body.description.length > 140) {
        return callback({ status: 'error', message: 'description is too long' })
      }

      const tweet = await Tweet.create({
        description: req.body.description,
        UserId: helpers.getUser(req).id
      })

      const user = await User.findByPk(tweet.UserId, {
        attributes: ['id', 'email', 'name', 'avatar']
      })

      let newTweet = {
        ...tweet.dataValues,
        User: user.dataValues,
        repliesCount: 0,
        likesCount: 0,
        isLiked: false
      }

      return callback({
        status: 'success',
        message: 'tweet successfully posted.',
        newTweet
      })
    } catch (error) {
      console.log(error)
    }
  },
  getTweet: async (req, res, callback) => {
    try {
      let tweet = await Tweet.findByPk(req.params.tweet_id, {
        attributes: ['id', 'description', 'createdAt'],
        include: [{ model: User, attributes: ['id', 'name', 'avatar'] }]
      })

      let likedUsers = await Like.findAll({
        where: { TweetId: req.params.tweet_id },
        attributes: ['UserId']
      })

      likedUsers = likedUsers.map((like) => like.UserId)

      tweet.dataValues.isLiked = likedUsers.includes(helpers.getUser(req).id)

      if (tweet) {
        return callback({
          tweet
        })
      } else {
        return callback({
          status: 'error',
          message: "target tweet didn't exist!"
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = tweetService
