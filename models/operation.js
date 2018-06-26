'use strict';

const db = require(__dirname + '/../db/sequelize');

const Operation = db.sequelize.define('OPERATION', {
  id: {
    type: db.Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    unique: true,
    primaryKey: true
  },
  target: {
    type: db.Sequelize.STRING,
    allowNull: false
  },
  amount: {
    type: db.Sequelize.DECIMAL(18,9),
    allowNull: false
  },
  message: {
    type: db.Sequelize.STRING,
    allowNull: false
  },
  result: {
    type: db.Sequelize.STRING,
    allowNull: false,
    defaultValue: 'pending'
  }
});
module.exports = Operation;