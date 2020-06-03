'use strict'
const helper = require('../_helpers.js')
const { generateChat } = helper
let { chatsList, messages } = generateChat()
// export
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Messages', messages)
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Messages', null, { truncate: true })
  }
}
