'use strict';
const faker = require('faker')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tweets',
      Array.from({ length: 50 }).map(d =>
        ({
          userId: 1 + Math.random() * 2,
          description: faker.lorem.text().substring(0, 140),
          createdAt: new Date(),
          updatedAt: new Date(),
        })
      ), {});



  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tweets', null, { truncate: true });
  }
};

//light up in git