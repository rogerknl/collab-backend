'use strict';
module.exports = (sequelize, DataTypes) => {
  var UserWallet = sequelize.define('UserWallet', {
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    wallet_id: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  }, {});
  UserWallet.associate = function(models) {
    UserWallet.hasMany(models.Operation);
    UserWallet.hasMany(models.Vote);
  };
  return UserWallet;
};