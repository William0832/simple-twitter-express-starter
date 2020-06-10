'use strict'
const bcrypt = require('bcrypt-nodejs')
const db = require('../models')
const User = db.User
// Set root block user2, find Id of user2 first
module.exports = {
  up: async (queryInterface, Sequelize) => {
    let user2Id = await User.findOne({ where: { name: 'user2' } })
    user2Id = user2Id.toJSON().id
    return queryInterface.bulkInsert(
      'Blockedships',
      [
        {
          createdBlockedId: 1,
          blockingId: user2Id,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Blockedships', null, {})
  }
}
