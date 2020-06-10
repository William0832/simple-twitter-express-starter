const tweetService = require('../../services/tweetService.js')

const tweetController = {
  getTweets: (req, res) => {
    tweetService.getTweets(req, res, (data) => {
      return res.json(data)
    }
    )
  },
  getTopUsers: (req, res) => {
    tweetService.getTopUsers(req, res, (data) => {
      return res.json(data)
    }
    )
  },
  postTweets: (req, res) => {
    tweetService.postTweets(req, res, (data) => {
      return res.status(302).json(data)
    }
    )
  },
  getTweet: (req, res) => {
    tweetService.getTweet(req, res, (data) => {
      return res.json(data)
    })
  }
}


module.exports = tweetController