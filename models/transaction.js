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
    },
    operation_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    wallet_id: {
      type: DataTypes.STRING,
      allowNull: false
    },

  }, {});
  Transaction.associate = function(models) {
    Transaction.belongsTo(models.Wallet,{foreignKey: 'wallet_id', targetKey:'publickey'});
    Transaction.belongsTo(models.Operation,{foreignKey: 'operation_id', targetKey:'id'});
  };
  return Transaction;
};