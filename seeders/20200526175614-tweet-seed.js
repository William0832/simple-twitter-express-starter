'use strict';
const faker = require('faker')

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const users = await queryInterface.sequelize.query(
      `SELECT id from USERS;`
    );

    const userRows = users[0];

    return queryInterface.bulkInsert('Tweets',
      Array.from({ length: 50 }).map(d =>
        ({
          userId: userRows[Math.floor(Math.random() * userRows.length)].id,
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