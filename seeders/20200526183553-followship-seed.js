'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Followships',
      Array.from({ length: 50 }).map(d => {
        let followship = {
          followerId: 1 + Math.random() * 52,
          followingId: 1 + Math.random() * 52,
          createdAt: new Date(),
          updatedAt: new Date(),
        }

        while (followship.followerId === followship.followingId) {
          followingId = 1 + Math.random() * 52
        }

        return followship
      }
      ), {});



  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Followships', null, { truncate: true });
  }
};
