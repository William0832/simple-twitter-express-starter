const db = require('../models')
const sequelize = require('sequelize')
const Tweet = db.Tweet
const User = db.User
const Reply = db.Reply
const helpers = require('../_helpers');

const replyService = {
  getReplies: async (req, res, callback) => {
    try {
      const tweet = await Tweet.findByPk(req.params.tweet_id, {
        attributes: ['id'],
        include: [
          {
            model: Reply, attributes: ['id', 'comment', 'createdAt'],
            include: [{ model: User, attributes: ['id', 'name'] }]
          }
        ]
      })

      return callback({
        tweet
      })

    } catch (error) {
      console.log(error);
    }
  },

  postReply: async (req, res, callback) => {
    try {
      // if (!req.body.comment) {
      //   return callback({ status: 'error', message: "reply didn't exist" })
      // }

      const reply = await Reply.create({
        UserId: helpers.getUser(req).id,
        TweetId: req.params.tweet_id,
        comment: req.body.comment,
      })

      return callback({ status: "success", message: 'reply successfully posted.', reply })
    }
    catch (error) {
      console.error(error);
    }
  }
}


module.exports = replyService