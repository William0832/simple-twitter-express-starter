'use strict'
module.exports = (sequelize, DataTypes) => {
  const Chat = sequelize.define('Chat', {
    CreatedUserId: DataTypes.INTEGER,
    InvitedUserId: DataTypes.INTEGER
  })
  Chat.associate = function (models) {
    Chat.hasMany(models.Message)
  }
  return Chat
}
