const likeService = require('../../services/likeService')

const likeController = {
    like: (req, res) => {
        console.log('like controller')
        likeService.like(req, res, (data) => {
            if (data.status === 'error') {
                return res.json(data)
            }
            return res.status(302).json(data)
        })
    },
    unlike: (req, res) => {
        likeService.unlike(req, res, (data) => {
            return res.status(302).json(data)
        })
    },
}

module.exports = likeController