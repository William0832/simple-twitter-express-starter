'use strict';
module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', {
    postUserId: DataTypes.INTEGER,
    notifyUserId: DataTypes.INTEGER,
    tweetId: DataTypes.INTEGER,
    message: DataTypes.STRING,
    checked: DataTypes.BOOLEAN,
    type: DataTypes.STRING
  }, {});
  Notification.associate = function (models) {
    Notification.belongsTo(models.User,
      {
        foreignKey: 'postUserId',
        as: 'postUser'
      }),
      Notification.belongsTo(models.User,
        {
          foreignKey: 'notifyUserId',
          as: 'notifyUser'
        })
  };
  return Notification;
};