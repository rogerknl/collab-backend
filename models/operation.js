'use strict';
module.exports = (sequelize, DataTypes) => {
  var Operation = sequelize.define('Operation', {
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    target: {
      type: DataTypes.STRING,
      allowNull: true
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: true
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
    user_to_act: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    userwallet_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    closed_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {});
  Operation.associate = function(models) {
    Operation.hasMany(models.Transaction,{foreignKey: 'operation_id', sourceKey: 'id'});
    Operation.hasMany(models.Vote,{foreignKey: 'operation_id', sourceKey: 'id'});

    Operation.belongsTo(models.UserWallet,{foreignKey: 'userwallet_id', targetKey: 'id'});
  };
  return Operation;
};