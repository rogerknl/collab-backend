'use strict';
module.exports = (sequelize, DataTypes) => {
  var Vote = sequelize.define('Vote', {
    value: DataTypes.STRING
  }, {});
  Vote.associate = function(models) {
    // associations can be defined here
  };
  return Vote;
};