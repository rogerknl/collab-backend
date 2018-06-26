'use strict';
module.exports = (sequelize, DataTypes) => {
  var Operation = sequelize.define('Operation', {
    target: {
      type: DataTypes.STRING,
      allowNull: false
    },
    amount: {
      type: DataTypes.DECIMAL(18,9),
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
    }
  }, {});
  Operation.associate = function(models) {
    Operation.hasMany(models.Transaction);
  };
  return Operation;
};