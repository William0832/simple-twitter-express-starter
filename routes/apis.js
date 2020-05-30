const express = require('express')
const router = express.Router()
// const multer = require('multer')
// const upload = multer({ dest: 'temp/' })
const passport = require('../config/passport')
const helpers = require('../_helpers');

const userController = require('../controllers/api/userController.js')
const tweetController = require('../controllers/api/tweetController.js')
const followshipController = require('../controllers/api/followshipController.js')
const likeController = require('../controllers/api/likeController')

const authenticated = (req, res, next) => {
  if (helpers.ensureAuthenticated(req)) {
    return next()
  }
  passport.authenticate('jwt', { failureRedirect: '/signIn', session: false })(req, res, next)
}
const authenticatedAdmin = (req, res, next) => {
  if (helpers.getUser(req)) {
    if (helpers.getUser(req).role == 'admin') { return next() }
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

//Followship routes
router.post('/followships/', authenticated, followshipController.postFollowship)
router.delete('/followships/:followingId', authenticated, followshipController.deleteFollowship)

// like routes
router.post('/tweets/:id/like', authenticated, likeController.like)
router.post('/tweets/:id/unlike', authenticated, likeController.unlike)

module.exports = router