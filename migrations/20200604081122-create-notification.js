'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Notifications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      postUserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      notifyUserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      tweetId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      message: {
        type: Sequelize.STRING
      },
      checked: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Notifications');
  }
};