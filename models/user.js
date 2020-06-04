'use strict'
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      name: DataTypes.STRING,
      avatar: DataTypes.STRING,
      introduction: DataTypes.TEXT,
      role: DataTypes.STRING,
      isOnline: DataTypes.BOOLEAN
    },
    {}
  )
  User.associate = function (models) {
    User.hasMany(models.Tweet)
    User.hasMany(models.Reply)
    User.hasMany(models.Like)
    User.belongsToMany(User, {
      through: models.Followship,
      foreignKey: 'followerId',
      as: 'Followings'
    })
    User.belongsToMany(User, {
      through: models.Followship,
      foreignKey: 'followingId',
      as: 'Followers'
    })
    User.belongsToMany(User, {
      through: models.Chat,
      foreignKey: 'CreatedUserId',
      as: 'Invitees'
    })
    User.belongsToMany(User, {
      through: models.Chat,
      foreignKey: 'InvitedUserId',
      as: 'Creators'
    })
    User.hasMany(models.Message)
  }
  return User
}
