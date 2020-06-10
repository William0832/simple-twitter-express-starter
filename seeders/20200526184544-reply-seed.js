'use strict';
const faker = require('faker')

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const users = await queryInterface.sequelize.query(
      `SELECT id from USERS;`
    );

    const userRows = users[0];

    const tweets = await queryInterface.sequelize.query(
      `SELECT id from TWEETS;`
    );

    const tweetRows = tweets[0];

    return queryInterface.bulkInsert('Replies',
      Array.from({ length: 250 }).map(d =>
        ({
          UserId: userRows[Math.floor(Math.random() * userRows.length)].id,
          TweetId: tweetRows[Math.floor(Math.random() * tweetRows.length)].id,
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

//light up in git