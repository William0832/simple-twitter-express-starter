const db = require('../models')
const { Tweet, User, Reply, Like } = db

const adminServices = {
  getTweets: async (req, res, callback) => {
    try {
      let tweets = await Tweet.findAll({
        raw: true,
        nest: true,
        include: [User, { model: Reply, include: [User] }]
      })
      callback({ tweets })
    } catch (err) {
      callback({ status: 'error', message: err.toString() })
    }
  },
  deleteTweet: async (req, res, callback) => {
    try {
      let tweet = await Tweet.findByPk(req.params.id)
      tweet.destroy()
      callback({
        status: 'success',
        message: `tweet:${tweet.id} was deleted `
      })
    } catch (err) {
      callback({ status: 'error', message: err.toString() })
    }
  },
  getUsers: async (req, res, callback) => {
    try {
      let users = await User.findAll({
        include: [
          Tweet,
          Reply,
          Like,
          { model: User, as: 'Followings' },
          { model: User, as: 'Followers' }
        ]
      })
      users = users.map((user) => ({
        ...user.dataValues,
        tweetsCount: user.Tweets.length,
        followingsCount: user.Followings.length,
        followersCount: user.Followers.length,
        likersCount: user.Likes.length
      }))
      users = users.sort((a, b) => b.tweetsCount - a.tweetsCount)
      return callback({ users })
    } catch (err) {
      callback({ status: 'error', message: err.toString() })
    }
  }
}
module.exports = adminServices
