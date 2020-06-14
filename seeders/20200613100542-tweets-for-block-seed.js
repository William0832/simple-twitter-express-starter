'use strict';
const db = require('../models');
const faker = require('faker');
const { Blockedship } = db;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let blocks = await Blockedship.findAll({ attribute: ['blockingId'] });
    blocks = blocks.map((e) => ({
      ...e.dataValues
    }));
    let tweetsNum = 2;
    let tweets = [];
    blocks.forEach((e) => {
      tweets.push(
        ...Array.from({ length: tweetsNum }).map((i) => ({
          userId: e.blockingId,
          description: faker.lorem.text().substring(0, 140),
          createdAt: new Date(),
          updatedAt: new Date()
        }))
      );
    });
    return queryInterface.bulkInsert('Tweets', tweets, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tweets', null, {});
  }
};
