'use strict';
const bcrypt = require('bcrypt-nodejs')
const faker = require('faker')

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Users', [{
      email: 'root@example.com',
      password: bcrypt.hashSync('12345678', bcrypt.genSaltSync(10), null),
      name: 'root',
      avatar: `https://loremflickr.com/240/240/man,women/?random=${Math.random() * 100}`,
      introduction: faker.lorem.text(),
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      email: 'user1@example.com',
      password: bcrypt.hashSync('12345678', bcrypt.genSaltSync(10), null),
      name: 'user1',
      avatar: `https://loremflickr.com/240/240/man,women/?random=${Math.random() * 100}`,
      introduction: faker.lorem.text(),
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      email: 'user2@example.com',
      password: bcrypt.hashSync('12345678', bcrypt.genSaltSync(10), null),
      name: 'user2',
      avatar: `https://loremflickr.com/240/240/man,women/?random=${Math.random() * 100}`,
      introduction: faker.lorem.text(),
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})



  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, { truncate: true });
  }
};
