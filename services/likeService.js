const db = require('../models')
const sequelize = require('sequelize')
const Like = db.Like
const User = db.User
const Tweet = db.Tweet
const helpers = require('../_helpers');

const likeService = {
    like: async (req, res, callback) => {
        try{
            const userId = helpers.getUser(req).id
            const tweetId = req.body.id
            const tweet = await Tweet.findByPk(tweetId, {
                attributes: ['id']
            })
            
            if(!tweet) {
                return callback({ status: 'error', message: 'This tweet doesn\'t exist.' })
            }

            let likedUsers = Tweet.findByPk(tweetId, {
                include: [{ model: User, as: 'likedUsers', attributes: ['id'] }]
            })

            let userList = likedUsers.map( user => user.id.toString())

            if (!userList.includes(tweetId)) {
                console.log('add following')
                const like = await Like.create({
                    userId: userId,
                    tweetId: tweetId
                })

                return callback({
                    
                })
            }
            else {
                return callback({ status: 'error', message: "already like this tweet." })
            }



        } catch(error) {

        }
    },
    unlike: async (req, res, callback) => {
        try {

        } catch (error) {

        }
    },
}

module.exports = likeService