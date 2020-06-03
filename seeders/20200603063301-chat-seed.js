'use strict'
const helper = require('../_helpers.js')
const { generateChat } = helper
let { chats, messages } = generateChat()

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Chats', chats)
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('chats', null, { truncate: true })
  }
}
