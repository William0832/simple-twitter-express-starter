'use strict';
const faker = require('faker')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Replies',
      Array.from({ length: 25 }).map(d =>
        ({
          UserId: 1 + Math.random() * 2,
          TweetId: 1 + Math.random() * 49,
          comment: faker.lorem.text().substring(0, 140),
          createdAt: new Date(),
          updatedAt: new Date(),
        })
      ), {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Replies', null, { truncate: true });
  }
};
