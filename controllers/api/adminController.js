const db = require('../../models')
const adminServices = require('../../services/adminServices.js')
const adminController = {
  getTweets: (req, res) =>
    adminServices.getTweets(req, res, (data) => res.json(data)),
  deleteTweet: (req, res) =>
    adminServices.deleteTweet(req, res, (data) => res.json(data)),
  getUsers: (req, res) =>
    adminServices.getUsers(req, res, (data) => res.json(data))
}
module.exports = adminController
