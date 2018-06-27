'use strict';
module.exports = (sequelize, DataTypes) => {
  var AddressBook = sequelize.define('AddressBook', {
    publickey: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    wallet_id: {
      type: DataTypes.STRING,
      allowNull: false
    },

  }, {});
  AddressBook.associate = function(models) {
    AddressBook.belongsTo(models.Wallet,{foreignKey: 'wallet_id', targetKey: 'publickey'});
  };
  return AddressBook;
};