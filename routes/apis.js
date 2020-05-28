const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer({ dest: 'temp/' })
const passport = require('../config/passport')

const userController = require('../controllers/api/userController.js')
const tweetController = require('../controllers/api/tweetController.js')
const adminController = require('../controllers/api/adminController.js')

const authenticated = passport.authenticate('jwt', { session: false })
const authenticatedAdmin = (req, res, next) => {
  if (req.user) {
    if (req.user.role === 'admin') {
      return next()
    }
    return res.json({ status: 'error', message: 'permission denied' })
  } else {
    return res.json({ status: 'error', message: 'permission denied' })
  }
}
const isRightUser = (req, res, next) => {
  if (String(req.user.id) === req.params.id) return next()
  return res.json({ status: 'error', message: '沒有修改權限' })
}

//User routes
router.post('/signup', userController.signUp)
router.post('/signin', userController.signIn)

router.get('/users/:id/tweets', authenticated, userController.getTweets)
router.get('/users/:id/followers', authenticated, userController.getFollowers)
router.get('/users/:id/followings', authenticated, userController.getFollowings)
router.get('/users/:id/likes', authenticated, userController.getLikes)
router.post(
  '/users/:id/edit',
  authenticated,
  isRightUser,
  upload.single('avatar'),
  userController.postUser
)
router.put(
  '/users/:id/edit',
  authenticated,
  isRightUser,
  upload.single('avatar'),
  userController.putUser
)

//Admin routes
router.get(
  '/admin/tweets',
  authenticated,
  authenticatedAdmin,
  adminController.getTweets
)
router.delete(
  '/admin/tweets/:id',
  authenticated,
  authenticatedAdmin,
  adminController.deleteTweet
)
router.get(
  '/admin/users',
  authenticated,
  authenticatedAdmin,
  adminController.getUsers
)

module.exports = router
