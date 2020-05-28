'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Likes',
      Array.from({ length: 25 }).map(d =>
        ({
          UserId: 1 + Math.random() * 2,
          TweetId: 1 + Math.random() * 49,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
      ), {});



  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Likes', null, { truncate: true });
  }
};
