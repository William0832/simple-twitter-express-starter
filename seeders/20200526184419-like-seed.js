'use strict';

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

    return queryInterface.bulkInsert('Likes',
      Array.from({ length: 100 }).map(d =>
        ({
          UserId: userRows[Math.floor(Math.random() * userRows.length)].id,
          TweetId: tweetRows[Math.floor(Math.random() * tweetRows.length)].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
      ), {});



  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Likes', null, { truncate: true });
  }
};
