'use strict';
module.exports = (sequelize, DataTypes) => {
  var UserWallet = sequelize.define('UserWallet', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    wallet_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {});
  UserWallet.associate = function(models) {
    UserWallet.hasMany(models.Operation,{foreignKey: 'userwallet_id', sourceKey: 'id'});
    UserWallet.hasMany(models.Vote,{foreignKey: 'userwallet_id', sourceKey: 'id'});

    UserWallet.belongsTo(models.Wallet,{foreignKey: 'wallet_id', targetKey:'publickey'});
    UserWallet.belongsTo(models.User,{foreignKey: 'user_id', targetKey: 'id'});
  };
  return UserWallet;
};