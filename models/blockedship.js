'use strict';
module.exports = (sequelize, DataTypes) => {
  const Blockedship = sequelize.define('Blockedship', {
    createdBlockedId: DataTypes.INTEGER,
    blockingId: DataTypes.INTEGER
  }, {});
  Blockedship.associate = function(models) {
    // associations can be defined here
  };
  return Blockedship;
};