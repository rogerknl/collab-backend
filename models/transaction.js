'use strict';
module.exports = (sequelize, DataTypes) => {
  var Transaction = sequelize.define('Transaction', {
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    amount: {
      type: DataTypes.DECIMAL(18,9),
      allowNull: false
    },
    counter_party: {
      type: DataTypes.STRING,
      allowNull: false
    },
    transaction_str: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  Transaction.associate = function(models) {
    // associations can be defined here
  };
  return Transaction;
};