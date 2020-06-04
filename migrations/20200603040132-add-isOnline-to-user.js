'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Users', 'isOnline', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: '0'
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Users', 'isOnline')
  }
}
