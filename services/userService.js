db = require('../models')
const { User, Tweet, Reply, Like } = db
const imgur = require('imgur-node-api')
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID
const helpers = require('../_helpers')
const getImgLink = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) return resolve(null)
    imgur.setClientID(IMGUR_CLIENT_ID)
    imgur.upload(file.path, (err, res) => {
      if (err) return reject(err)
      return resolve(res.data.link)
    })
  })
}
const letsCheck = (user, currentUser) => {
  user.isCurrentUser = currentUser.id === user.id ? true : false
  user.isFollowed = currentUser.Followings.map((d) => d.id).includes(user.id)
    ? true
    : false
}
const letsCount = (user) => {
  user.tweetsCount = user.Tweets ? user.Tweets.length : 0
  user.followingCount = user.Followings ? user.Followings.length : 0
  user.followerCount = user.Followers ? user.Followers.length : 0
  user.likeCount = user.Likes ? user.Likes.length : 0
}
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
const userService = {
  getUser: async (req, res, callback) => {
    try {
      let user = await User.findByPk(req.params.id, {
        attributes: ['id', 'email', 'name', 'avatar', 'introduction', 'role'],
        include: [
          { model: Tweet, attributes: ['id'] },
          { model: User, as: 'Followings', attributes: ['id'] },
          { model: User, as: 'Followers', attributes: ['id'] },
          { model: Like, attributes: ['tweetId'] }
        ]
      })
      user = user.toJSON()
      let currentUser = helpers.getUser(req)
      letsCheck(user, currentUser)
      letsCount(user)
      removeKeys(user, ['Tweets', 'Followers', 'Followings', 'Likes'])
      callback({ user })
    } catch (err) {
      callback({ status: 'error', message: err.toString() })
    }
  },
  getTweets: async (req, res, callback) => {
    try {
      let currentUser = helpers.getUser(req)
      let tweets = await Tweet.findAll({
        where: { UserId: req.params.id },
        include: [
          { model: User, attributes: ['id', 'email', 'name', 'avatar'] },
          { model: Reply, attributes: ['id', 'UserId'] },
          { model: Like, attributes: ['id', 'UserId'] }
        ],
        order: [['createdAt', 'DESC']]
      })
      tweets = tweets.map((t) => ({
        ...t.dataValues,
        repliesCount: t.Replies.length || 0,
        likesCount: t.Likes.length || 0,
        isLiked: currentUser.Likes
          ? currentUser.Likes.map((cl) => cl.tweetId).includes(t.id)
          : null
      }))
      removeKeys(tweets, ['Replies', 'Likes'])
      callback({ tweets })
    } catch (err) {
      callback({ status: 'error', message: err.toString() })
    }
  },
  getFollowers: async (req, res, callback) => {
    try {
      let currentUser = helpers.getUser(req)
      let user = await User.findByPk(req.params.id, {
        include: [
          {
            model: User,
            as: 'Followers',
            attributes: [
              'id',
              'email',
              'name',
              'avatar',
              'introduction',
              'role'
            ]
          }
        ]
      })
      user = user.toJSON()
      let followers = user.Followers
      followers = followers.map((u) => ({
        ...u,
        isCurrentUser: currentUser.id === u.id ? true : false,
        isFollowed: currentUser.Followings.map((d) => d.id).includes(u.id),
        followAt: u.Followship.createdAt
      }))
      followers.sort((a, b) => b.followAt - a.followAt)
      removeKeys(followers, ['Followship'])
      callback({ followers })
    } catch (err) {
      callback({ status: 'error', message: err.toString() })
    }
  },
  getFollowings: async (req, res, callback) => {
    try {
      let currentUser = helpers.getUser(req)
      let user = await User.findByPk(req.params.id, {
        include: [
          {
            model: User,
            as: 'Followings',
            attributes: [
              'id',
              'email',
              'name',
              'avatar',
              'introduction',
              'role'
            ]
          }
        ]
      })
      let followings = user.toJSON().Followings.map((u) => ({
        ...u,
        isCurrentUser: currentUser.id === u.id ? true : false,
        isFollowed: currentUser.Followings.map((d) => d.id).includes(u.id),
        followAt: u.Followship.createdAt
      }))
      followings.sort((a, b) => b.followAt - a.followAt)
      removeKeys(followings, ['Followship'])
      callback({ followings })
    } catch (err) {
      callback({ status: 'error', message: err.toString() })
    }
  },
  getLikes: async (req, res, callback) => {
    try {
      let currentUser = helpers.getUser(req)
      let user = await User.findByPk(req.params.id, {
        include: [
          {
            model: Like,
            attributes: ['createdAt'],
            include: [
              {
                model: Tweet,
                attributes: ['id', 'description', 'createdAt'],
                include: [
                  {
                    model: User,
                    attributes: ['id', 'email', 'name', 'avatar']
                  },
                  {
                    model: Reply,
                    attributes: ['id', 'UserId']
                  },
                  {
                    model: Like,
                    attributes: ['id', 'UserId']
                  }
                ]
              }
            ]
          }
        ]
      })

      let likes = user.toJSON().Likes.map((l) => ({
        ...l.Tweet,
        likeAt: l.createdAt,
        repliesCount: l.Tweet.Replies ? l.Tweet.Replies.length : 0,
        likesCount: l.Tweet.Likes ? l.Tweet.Likes.length : 0,
        isLiked: currentUser.Likes
          ? currentUser.Likes.map((cl) => cl.tweetId).includes(l.Tweet.id)
          : null
      }))
      removeKeys(likes, ['Replies', 'Likes'])
      likes.sort((a, b) => b.likeAt - a.likeAt)
      callback({ likes })
    } catch (err) {
      callback({ status: 'error', message: err.toString() })
    }
  },
  putUser: async (req, res, callback) => {
    try {
      if (!req.body.name) {
        callback({ status: 'error', message: "name didn't exist" })
      }
      const { file } = req
      let imgLink = await getImgLink(file)
      let user = await User.findByPk(req.params.id)
      user.update({
        name: req.body.name || user.name,
        introduction: req.body.introduction,
        avatar: imgLink || user.avatar
      })
      callback({
        status: 'success',
        message: 'user was successfully to update'
      })
    } catch (err) {
      callback({ status: 'error', message: 'ooo' + err.toString() })
    }
  }
}

module.exports = userService
