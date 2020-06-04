'use strict'
const utils = require('./seedUtils/seedUtils.js')
const { generateChat } = utils
let { chats, messages } = generateChat()

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Chats', chats)
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('chats', null, { truncate: true })
  }
}
