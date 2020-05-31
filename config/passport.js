const passport = require('passport')
const LocalStrategy = require('passport-local')
const bcrypt = require('bcrypt-nodejs')
const db = require('../models')
const { User, Like } = db

// setup passport strategy
passport.use(
  new LocalStrategy(
    // customize user field
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    // authenticate user
    (req, username, password, cb) => {
      User.findOne({ where: { email: username } }).then((user) => {
        if (!user)
          return cb(
            null,
            false,
            req.flash('error_messages', '帳號或密碼輸入錯誤')
          )
        if (!bcrypt.compareSync(password, user.password))
          return cb(
            null,
            false,
            req.flash('error_messages', '帳號或密碼輸入錯誤！')
          )
        return cb(null, user.get()) // 此處與影片示範不同
      })
    }
  )
)

// JWT
const jwt = require('jsonwebtoken')
const passportJWT = require('passport-jwt')
const ExtractJwt = passportJWT.ExtractJwt
const JwtStrategy = passportJWT.Strategy

let jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
jwtOptions.secretOrKey = process.env.JWT_SECRET
// jwtOptions.passReqToCallback = true

let strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
  User.findByPk(jwt_payload.id, {
    include: [
      { model: Like, attributes: ['tweetId'] },
      { model: User, as: 'Followers', attributes: ['id'] },
      { model: User, as: 'Followings', attributes: ['id'] }
    ]
  }).then((user) => {
    if (!user) return next(null, false)
    return next(null, user)
  })
})
passport.use(strategy)

// serialize and deserialize user
passport.serializeUser((user, cb) => {
  cb(null, user.id)
})
passport.deserializeUser((id, cb) => {
  User.findByPk(id, {
    // include: [
    //   { model: db.Restaurant, as: 'FavoritedRestaurants' },
    //   { model: db.Restaurant, as: 'LikedRestaurants' },
    //   { model: User, as: 'Followers' },
    //   { model: User, as: 'Followings' }
    // ]
  }).then((user) => {
    user = user.toJSON()
    return cb(null, user)
  })
})

module.exports = passport
