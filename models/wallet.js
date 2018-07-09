'use strict';
module.exports = (sequelize, DataTypes) => {
  var Wallet = sequelize.define('Wallet', {
    publickey: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true
    },
    privatekey: {
      type: DataTypes.STRING,
      allowNull: false
    },
    wif: {
      type: DataTypes.STRING,
      allowNull: false
    },
    alias: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  Wallet.associate = function(models) {
    Wallet.hasMany(models.AddressBook,{foreignKey: 'wallet_id', sourceKey: 'publickey'});
    Wallet.hasMany(models.Transaction,{foreignKey: 'wallet_id', sourceKey: 'publickey'});
    Wallet.hasMany(models.UserWallet,{foreignKey: 'wallet_id', sourceKey: 'publickey'});
  };
  return Wallet;
};