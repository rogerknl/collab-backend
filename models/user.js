'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true },
    firstname: {
      type: DataTypes.STRING,
      allowNull: true
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false},
    valid_email: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    publickey: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {});
  User.associate = function(models) {
    User.hasMany(models.UserWallet,{foreignKey: 'user_id', sourceKey: 'id'});
  };
  return User;
};