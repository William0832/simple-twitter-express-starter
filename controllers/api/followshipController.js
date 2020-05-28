const followshipService = require('../../services/followshipService.js')


const followshipController = {
  postFollowship: (req, res) => {
    followshipService.postFollowship(req, res, (data) => {
      if (data.status === 'error') {
        return res.json(data)
      }
      return res.status(302).json(data)
    })
  },
  deleteFollowship: (req, res) => {
    followshipService.deleteFollowship(req, res, (data) => {
      return res.status(302).json(data)
    })
  },
}

module.exports = followshipController