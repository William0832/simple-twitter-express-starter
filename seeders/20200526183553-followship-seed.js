'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await queryInterface.sequelize.query(`SELECT id from USERS;`)

    const userRows = users[0]

    return queryInterface.bulkInsert(
      'Followships',
      Array.from({ length: 50 }).map((d) => {
        let followship = {
          followerId: userRows[Math.floor(Math.random() * userRows.length)].id,
          followingId: userRows[Math.floor(Math.random() * userRows.length)].id,
          createdAt: new Date(),
          updatedAt: new Date()
        }

        while (followship.followerId === followship.followingId) {
          followship.followingId =
            userRows[Math.floor(Math.random() * userRows.length)].id
        }

        return followship
      }),
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Followships', null, { truncate: true })
  }
}
