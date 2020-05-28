db = require('../models')
const { User, Tweet, Reply, Like } = db
const imgur = require('imgur-node-api')
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID

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
      callback({ user: user.toJSON() })
    } catch (err) {
      callback({ status: 'error', message: err.toString() })
    }
  },
  getFollowings: async (req, res, callback) => {
    try {
      let user = await User.findByPk(req.params.id, {
        include: [{ model: User, as: 'Followings' }]
      })
      callback({ user: user.toJSON() })
    } catch (err) {
      callback({ status: 'error', message: err.toString() })
    }
  },
  getLikes: async (req, res, callback) => {
    try {
      let user = await User.findByPk(req.params.id, {
        include: [
          {
            model: Like,
            include: [
              {
                model: Tweet,
                include: [User, Reply, Like]
              }
            ]
          }
        ]
      })
      callback({ user: user.toJSON() })
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
  postUser: async (req, res, callback) => {
    try {
      if (!req.body.name) {
        callback({ status: 'error', message: "name didn't exist" })
      }
      const { file } = req
      let imgLink = await getImgLink(file)
      await User.create({
        name: req.body.name,
        introduction: req.body.introduction,
        image: imgLink
      })
      callback({
        status: 'success',
        message: 'user was successfully to created'
      })
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
