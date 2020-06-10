const blockService = require('../../services/blockService.js')
const blockController = {
  postBlock: (req, res) => {
    blockService.postBlocks(req, res, (data) => {
      if (data.status === 'error') return res.status(302).json(data)
      return res.json(data)
    })
  },

  getBlocks: (req, res) => {
    blockService.getBlocks(req, res, (data) => {
      if (data.status === 'error') return res.status(302).json(data)
      return res.json(data)
    })
  },
  deleteBlock: (req, res) =>
    blockService.deleteBlock(req, res, (data) => res.status(302).json(data))
}
module.exports = blockController
