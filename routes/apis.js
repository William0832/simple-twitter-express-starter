const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer({ dest: 'temp/' })
const passport = require('../config/passport')
const helpers = require('../_helpers')

const adminController = require('../controllers/api/adminController.js')
const userController = require('../controllers/api/userController.js')
const tweetController = require('../controllers/api/tweetController.js')
const replyController = require('../controllers/api/replyController.js')
const followshipController = require('../controllers/api/followshipController.js')
const likeController = require('../controllers/api/likeController')
const chatController = require('../controllers/api/chatController')

const authenticated = (req, res, next) => {
  if (helpers.ensureAuthenticated(req)) {
    return next()
  }
  passport.authenticate('jwt', { failureRedirect: '/signIn', session: false })(
    req,
    res,
    next
  )
}
const authenticatedAdmin = (req, res, next) => {
  let user = helpers.getUser(req)
  if (user) {
    if (user.role === 'admin') {
      return next()
    }
    return res
      .status(302)
      .json({ status: 'error', message: 'permission denied' })
  } else {
    return res.json({ status: 'error', message: 'permission denied' })
  }
}
const isOwner = (req, res, next) => {
  let user = helpers.getUser(req)
  if (String(user.id) === req.params.id) return next()
  return res.status(302).json({ status: 'error', message: '沒有修改權限' })
}

const checkRoute = (req, res, next) => {
  console.log('here!')
  return next()
}

//User routes
router.post('/signup', userController.signUp)
router.post('/signin', userController.signIn)

//Root
router.get('/', authenticated, (req, res) => res.redirect('/tweets'))

//Tweets routes
router.get('/tweets', authenticated, tweetController.getTweets)
router.post('/tweets', authenticated, tweetController.postTweets)
router.get('/tweets/:tweet_id', authenticated, tweetController.getTweet)

//User routes
router.get('/users/:id', authenticated, userController.getUser)
router.get('/users/:id/tweets', authenticated, userController.getTweets)
router.get('/users/:id/followers', authenticated, userController.getFollowers)
router.get('/users/:id/followings', authenticated, userController.getFollowings)
router.get('/users/:id/likes', authenticated, userController.getLikes)
router.get('/users/:id/edit', authenticated, isOwner, userController.getUser)
// 更新資料用POST 不符合RESTful路由設計 但TEST要過只能如此
router.post(
  '/users/:id/edit',
  authenticated,
  isOwner,
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

//Reply routes
router.get(
  '/tweets/:tweet_id/replies',
  authenticated,
  replyController.getReplies
)
router.post(
  '/tweets/:tweet_id/replies',
  authenticated,
  replyController.postReply
)

//Followship routes
router.post('/followships/', authenticated, followshipController.postFollowship)
router.delete(
  '/followships/:followingId',
  authenticated,
  followshipController.deleteFollowship
)
// like routes
router.post('/tweets/:id/like', authenticated, likeController.like)
router.post('/tweets/:id/unlike', authenticated, likeController.unlike)

// chat
// db 開新的聊天室
router.post('/chats', authenticated, chatController.postChat)
//db 抓取開過的聊天室清單
router.get('/chats', authenticated, chatController.getChats)
// db 抓取單一聊天室，要拿到聊天對象的userId
router.get('/chats/:id', authenticated, chatController.getChat)
// db 將發出的新訊息存入
router.post('/chats/msg', authenticated, chatController.postMsg)
//db 取得聊天室的全部訊息
router.get('/chats/msg', authenticated, chatController.getMsgs)

module.exports = router
