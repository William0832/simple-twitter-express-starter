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

const userService = {
  getTweets: async (req, res, callback) => {
    try {
      let user = await User.findByPk(req.params.id, {
        include: [
          {
            model: Tweet,
            include: [User, Reply, Like]
          },
          { model: Like },
          { model: User, as: 'Followings' },
          { model: User, as: 'Followers' }
        ]
      })
      callback({ user: user.toJSON() })
    } catch (err) {
      callback({ status: 'error', message: err.toString() })
    }
  },
  getFollowers: async (req, res, callback) => {
    try {
      let user = await User.findByPk(req.params.id, {
        include: [{ model: User, as: 'Followers' }]
      })
      let currentUser = helpers.getUser(req).toJSON()
      user = user.toJSON()
      let followers = user.Followers
      user.Followers = followers.map((u) => ({
        ...u,
        isFollowed: currentUser.Followings.map((d) => d.id).includes(u.id)
      }))
      callback({ user })
    } catch (err) {
      callback({ status: 'error', message: err.toString() })
    }
  },
  getFollowings: async (req, res, callback) => {
    try {
      let user = await User.findByPk(req.params.id, {
        include: [{ model: User, as: 'Followings' }]
      })
      let currentUser = helpers.getUser(req).toJSON()
      user = user.toJSON()
      let followings = user.Followings
      user.Followings = followings.map((u) => ({
        ...u,
        isFollowed: currentUser.Followings.map((d) => d.id).includes(u.id)
      }))
      callback({ user })
    } catch (err) {
      callback({ status: 'error', message: err.toString() })
    }
  },
  getLikes: async (req, res, callback) => {
    try {
      let user = await User.findByPk(req.params.id, {
        include: [{ model: Tweet, as: 'LikedTweets', include: [User, Reply] }]
      })
      let currentUser = helpers.getUser(req).toJSON()
      user = user.toJSON()
      let likedTweets = user.LikedTweets
      user.LikedTweets = likedTweets.map((t) => ({
        ...t,
        isLiked: currentUser.LikedTweets.map((ct) => ct.id).includes(t.id)
      }))
      callback({ user })
    } catch (err) {
      callback({ status: 'error', message: err.toString() })
    }
  },
  getEditPage: async (req, res, callback) => {
    try {
      let user = await User.findByPk(req.params.id)
      callback({ user: user.toJSON() })
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
      callback({ status: 'error', message: err.toString() })
    }
  }
}

module.exports = userService
