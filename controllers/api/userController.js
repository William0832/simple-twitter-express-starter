const bcrypt = require('bcrypt-nodejs')
const db = require('../../models')
const User = db.User
const userService = require('../../services/userService.js')

// JWT
const jwt = require('jsonwebtoken')
const passportJWT = require('passport-jwt')
const ExtractJwt = passportJWT.ExtractJwt
const JwtStrategy = passportJWT.Strategy

let userController = {
  signUp: async (req, res) => {
    if (req.body.passwordCheck !== req.body.password) {
      return res.json({ status: 'error', message: '兩次密碼輸入不同！' })
    }
    // 排除 email、name 重複的user
    let user = await User.findOne({
      where: {
        $or: [{ email: req.body.email }, { name: req.body.name }]
      }
    })
    if (user) {
      return res.json({
        status: 'error',
        message: 'Name or Email 和其他使用者重複了！'
      })
    }
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10), null)
    })
    return res.json({ status: 'success', message: '成功註冊帳號！' })
  },

  signIn: (req, res) => {
    // 檢查必要資料
    if (!req.body.email || !req.body.password) {
      return res.json({
        status: 'error',
        message: "required fields didn't exist"
      })
    }
    // 檢查 user 是否存在與密碼是否正確
    let username = req.body.email
    let password = req.body.password

    User.findOne({ where: { email: username } }).then((user) => {
      if (!user)
        return res
          .status(401)
          .json({ status: 'error', message: 'no such user found' })
      if (!bcrypt.compareSync(password, user.password)) {
        return res
          .status(401)
          .json({ status: 'error', message: 'passwords did not match' })
      }
      // 簽發 token
      var payload = { id: user.id }
      var token = jwt.sign(payload, process.env.JWT_SECRET)
      return res.json({
        status: 'success',
        message: 'ok',
        token: token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          isOnline: true
        }
      })
    })
  },
  getUser: (req, res) =>
    userService.getUser(req, res, (data) => res.json(data)),
  getTweets: (req, res) =>
    userService.getTweets(req, res, (data) => res.json(data)),
  getFollowers: (req, res) =>
    userService.getFollowers(req, res, (data) => res.json(data)),
  getFollowings: (req, res) =>
    userService.getFollowings(req, res, (data) => res.json(data)),
  getLikes: (req, res) =>
    userService.getLikes(req, res, (data) => res.json(data)),
  putUser: (req, res) =>
    userService.putUser(req, res, (data) => res.status(302).json(data)),
  getCurrentUser: (req, res) => {
    userService.getCurrentUser(req, res, (data) => res.json(data))
  }
}

module.exports = userController
