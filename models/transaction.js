'use strict';
module.exports = (sequelize, DataTypes) => {
  var Transaction = sequelize.define('Transaction', {
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    counter_party: {
      type: DataTypes.STRING,
      allowNull: true
    },
    transaction_str: {
      type: DataTypes.STRING,
      allowNull: false
    },
    operation_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    wallet_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },

  }, {});
  Transaction.associate = function(models) {
    Transaction.belongsTo(models.Wallet,{foreignKey: 'wallet_id', targetKey:'publickey'});
    Transaction.belongsTo(models.Operation,{foreignKey: 'operation_id', targetKey:'id'});
  };
  return Transaction;
};