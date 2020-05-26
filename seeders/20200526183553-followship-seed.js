'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Followships',
      Array.from({ length: 3 }).map(d =>
        ({
          followerId: 1 + Math.random() * 2,
          followingId: 1 + Math.random() * 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
      ), {});



  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Followships', null, { truncate: true });
  }
};
