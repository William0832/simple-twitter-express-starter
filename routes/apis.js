const express = require('express')
const router = express.Router()
// const multer = require('multer')
// const upload = multer({ dest: 'temp/' })
const passport = require('../config/passport')
const helpers = require('../_helpers');

const userController = require('../controllers/api/userController.js')
const tweetController = require('../controllers/api/tweetController.js')
const replyController = require('../controllers/api/replyController.js')

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

//Root
router.get('/', authenticated, (req, res) => res.redirect('/tweets'))

//Reply routes
router.get('/tweets/:tweet_id/replies', authenticated, replyController.getReplies)
router.post('/tweets/:tweet_id/replies', authenticated, replyController.postReply)

module.exports = router