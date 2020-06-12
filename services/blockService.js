const db = require('../models');
const { Blockedship, User } = db;
const helpers = require('../_helpers');

const removeKeys = (data, keys) => {
  if (Object.keys(data).includes(...keys)) {
    keys.forEach((k) => {
      delete data[k];
    });
  } else {
    data.forEach((d) => {
      keys.forEach((k) => {
        delete d[k];
      });
    });
  }
};
const blockServices = {
  // postman check ok~
  postBlock: async (req, res, callback) => {
    try {
      let currentUserId = helpers.getUser(req).id;
      // can not block user self
      if (currentUserId === req.params.blockerId) {
        return callback({
          status: 'error',
          message: '不能封鎖自己'
        });
      }
      let block = await Blockedship.findOne({
        where: {
          $and: {
            createdBlockedId: currentUserId,
            blockingId: req.params.blockerId
          }
        }
      });
      if (block) {
        block = block.dataValues || block;
        console.log('================= exist block: ', block);
        return callback({
          status: 'error',
          message: 'this block is exist'
        });
      }
      // create new
      block = await Blockedship.create({
        createdBlockedId: currentUserId,
        blockingId: req.params.blockerId
      });
      block = block.dataValues || block;
      console.log('================= new block: ', block);
      callback({
        status: 'success',
        message: `blocker: ${block.blockingId} was created `
      });
    } catch (err) {
      console.log(err.toString());
    }
  },
  getBlocks: async (req, res, callback) => {
    try {
      let currentUserId = helpers.getUser(req).id;
      let currentUser = await User.findByPk(currentUserId, {
        attributes: ['id', 'name'],
        include: [
          {
            model: User,
            as: 'Blockers',
            attributes: ['id', 'name']
          }
        ]
      });
      let blockers = currentUser.toJSON().Blockers;
      blockers = blockers.map((e) => {
        let temp = {
          ...e,
          createdAt: e.Blockedship.createdAt
        };
        delete temp.Blockedship;
        return temp;
      });
      callback({ blockers });
    } catch (err) {
      callback({ status: 'error', message: err.toString() });
    }
  },
  deleteBlock: async (req, res, callback) => {
    try {
      let currentUserId = helpers.getUser(req).id;

      let block = await Blockedship.findOne({
        where: {
          $and: {
            createdBlockedId: currentUserId,
            blockingId: req.params.blockerId
          }
        },
        attributes: ['blockingId']
      });
      block.destroy();
      block = block.dataValues || block;
      callback({
        status: 'success',
        message: `blocker:${block.blockingId} was deleted `
      });
    } catch (err) {
      callback({ status: 'error', message: err.toString() });
    }
  }
};
module.exports = blockServices;
