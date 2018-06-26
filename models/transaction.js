'use strict';
const db = require(__dirname + '/../db/sequelize');



const Transaction = db.sequelize.define('TRANSACTION', {
  id: {
    type: db.Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    unique: true,
    primaryKey: true
  },
  type: {
    type: db.Sequelize.STRING,
    allowNull: false
  },
  amount: {
    type: db.Sequelize.DECIMAL(18,9),
    allowNull: false
  },
  counter_party: {
    type: db.Sequelize.STRING,
    allowNull: false
  },
  transaction_str: {
    type: db.Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Transaction;