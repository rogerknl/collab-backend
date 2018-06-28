'use strict';
module.exports = (sequelize, DataTypes) => {
  var Operation = sequelize.define('Operation', {
    target: {
      type: DataTypes.STRING,
      allowNull: false
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false
    },
    result: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'pending'
    },
    userwallet_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Operation.associate = function(models) {
    Operation.hasMany(models.Transaction,{foreignKey: 'operation_id', sourceKey: 'id'});
    Operation.hasMany(models.Vote,{foreignKey: 'operation_id', sourceKey: 'id'});

    Operation.belongsTo(models.UserWallet,{foreignKey: 'userwallet_id', targetKey: 'id'});
  };
  return Operation;
};