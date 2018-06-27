'use strict';
module.exports = (sequelize, DataTypes) => {
  var Vote = sequelize.define('Vote', {
    value: DataTypes.STRING,
    userwallet_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    operation_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});
  Vote.associate = function(models) {
    Vote.belongsTo(models.UserWallet,{foreignKey: 'userwallet_id', targetKey: 'id'});
    Vote.belongsTo(models.Operation,{foreignKey: 'operation_id', targetKey: 'id'});
  };
  return Vote;
};