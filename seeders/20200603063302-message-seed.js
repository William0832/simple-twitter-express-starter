'use strict'
const utils = require('./seedUtils/seedUtils.js')
const { generateChat } = utils
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
