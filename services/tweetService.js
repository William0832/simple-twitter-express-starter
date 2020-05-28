const db = require('../models')
const sequelize = require('sequelize')
const Tweet = db.Tweet

const tweetService = {
  getTweets: (req, res, callback) => {
    return callback({
      message: 'getTweets'
    })
  }
}

module.exports = tweetService