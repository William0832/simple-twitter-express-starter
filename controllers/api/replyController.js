const replyService = require('../../services/replyService.js')


const replyController = {
  getReplies: (req, res) => {
    replyService.getReplies(req, res, (data) => {
      return res.json(data)
    })
  },

  postReply: (req, res) => {
    replyService.postReply(req, res, (data) => {
      return res.status(302).json(data)
    })
  },
}

module.exports = replyController