'use strict'
const bcrypt = require('bcrypt-nodejs')
const faker = require('faker')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          email: 'root@example.com',
          password: bcrypt.hashSync('12345678', bcrypt.genSaltSync(10), null),
          name: 'root',
          avatar: `https://loremflickr.com/240/240/man,women/?random=${
            Math.random() * 100
          }`,
          introduction: faker.lorem.text(),
          role: 'admin',
          isOnline: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          email: 'user1@example.com',
          password: bcrypt.hashSync('12345678', bcrypt.genSaltSync(10), null),
          name: 'user1',
          avatar: `https://loremflickr.com/240/240/man,women/?random=${
            Math.random() * 100
          }`,
          introduction: faker.lorem.text(),
          role: 'user',
          isOnline: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          email: 'user2@example.com',
          password: bcrypt.hashSync('12345678', bcrypt.genSaltSync(10), null),
          name: 'user2',
          avatar: `https://loremflickr.com/240/240/man,women/?random=${
            Math.random() * 100
          }`,
          introduction: faker.lorem.text(),
          role: 'user',
          isOnline: false,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    )

    return queryInterface.bulkInsert(
      'Users',
      Array.from({ length: 50 }).map((d) => ({
        email: faker.internet.email(),
        password: bcrypt.hashSync('12345678', bcrypt.genSaltSync(10), null),
        name: faker.name.findName(),
        avatar: `https://loremflickr.com/240/240/man,women/?random=${
          Math.random() * 100
        }`,
        introduction: faker.lorem.text(),
        role: 'user',
        isOnline: false,
        createdAt: new Date(),
        updatedAt: new Date()
      })),
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, { truncate: true })
  }
}
