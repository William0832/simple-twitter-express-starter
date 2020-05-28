const express = require('express')
const router = express.Router()
// const multer = require('multer')
// const upload = multer({ dest: 'temp/' })
const passport = require('../config/passport')

const userController = require('../controllers/api/userController.js')
const tweetController = require('../controllers/api/tweetController.js')

const authenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  passport.authenticate('jwt', { failureRedirect: '/signIn', session: false })(req, res, next)
}
const authenticatedAdmin = (req, res, next) => {
  if (req.user) {
    if (req.user.isAdmin) { return next() }
    return res.json({ status: 'error', message: 'permission denied' })
  } else {
    return res.json({ status: 'error', message: 'permission denied' })
  }
}

//User routes
router.post('/signup', userController.signUp)
router.post('/signin', userController.signIn)


router.get('/', authenticated, (req, res) => res.redirect('/tweets'))

//Tweets routes
router.get('/tweets', authenticated, tweetController.getTweets)



module.exports = router