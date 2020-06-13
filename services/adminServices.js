const db = require('../models')
const { Tweet, User, Reply, Like } = db
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
const adminServices = {
  getTweets: async (req, res, callback) => {
    try {
      let tweets = await Tweet.findAll({
        include: [
          {
            model: User,
            attributes: ['id', 'email', 'name', 'avatar']
          },
          {
            model: Reply,
            attributes: ['id', 'UserId', 'comment', 'createdAt', 'updatedAt'],
            include: [{
              model: User,
              attributes: ['id', 'name']
            }]
          },
          Like
        ]
      })
      tweets = tweets.map((t) => ({
        ...t.dataValues,
        Replies: t.Replies.map((r) => ({
          ...r.dataValues,
          comment: r.comment.substring(0, 50)
        })),
        repliesCount: t.Replies.length || 0,
        likesCount: t.Likes.length || 0,
        showReplies: false
      }))
      tweets.sort((a, b) => b.repliesCount - a.repliesCount)
      removeKeys(tweets, ['Likes'])
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
        attributes: [
          'id',
          'email',
          'name',
          'avatar',
          'introduction',
          'role',
          'createdAt',
          'updatedAt'
        ],
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
        likesCount: user.Likes.length
      }))
      removeKeys(users, [
        'Tweets',
        'Replies',
        'Likes',
        'Followings',
        'Followers'
      ])
      users = users.sort((a, b) => b.tweetsCount - a.tweetsCount)
      return callback({ users })
    } catch (err) {
      callback({ status: 'error', message: err.toString() })
    }
  }
}
module.exports = adminServices
