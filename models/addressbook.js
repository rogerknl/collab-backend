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
  }, {});
  AddressBook.associate = function(models) {
    // associations can be defined here
  };
  return AddressBook;
};