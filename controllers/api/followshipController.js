const followshipService = require('../../services/followshipService.js')


const followshipController = {
  postFollowship: (req, res) => {
    followshipService.postFollowship(req, res, (data) => {
      return res.json(data)
    })
  },
  deleteFollowship: (req, res) => {
    followshipService.deleteFollowship(req, res, (data) => {
      return res.json(data)
    })
  },
}

module.exports = followshipController