const db = require('../models')
const sequelize = require('sequelize')
const Followship = db.Followship
const User = db.User
const helpers = require('../_helpers');

const followshipService = {
  postFollowship: async (req, res, callback) => {
    try {
      const followerId = String(helpers.getUser(req).id)
      const followingId = req.body.id
    
      if (followerId === followingId) {
        return callback({ status: 'error', message: "users can't follow themselves" })
      }
      const followingUser = await User.findByPk(followingId, {
        attributes: ['id']
      })
      if (!followingUser) {
        return callback({ status: 'error', message: "following target didn't exist" })
      }
      const checkFollowship = await User.findByPk(followerId, {
        attributes: [],
        include: [
          {
            model: User, as: 'Followings', attributes: ['id']
          }
        ]
      })
      //Check if already following target user
      const followings = checkFollowship.Followings.map(function (following) {
        return String(following.id)
      })

      if (!followings.includes(followingId)) {
        console.log('add following')
        const followship = await Followship.create({
          followerId: followerId,
          followingId: followingId
        })

        return callback({
          followship
        })
      }
      else {
        return callback({ status: 'error', message: "already following this user" })
      }


    } catch (error) {
      console.error(error)
    }
  },
  deleteFollowship: async (req, res, callback) => {
    try {
      const followship = await Followship.destroy(
        {
          where: {
            followerId: helpers.getUser(req).id,
            followingId: req.params.followingId
          }
        }
      )

      if (followship) {

        return callback({ status: "success", message: "", followship: followship })
      }
      else {
        return callback({ status: "error", message: "target followship didn't exist" })
      }

    } catch (error) {
      console.error(error)
    }
  }
}

module.exports = followshipService