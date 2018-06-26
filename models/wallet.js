'use strict';
const db = require(__dirname + '/../db/sequelize');

const Wallet = db.sequelize.define('WALLET', {
  publickey: {
    type: db.Sequelize.STRING,
    allowNull: false,
    unique: true,
    primaryKey: true
  },
  privatekey: {
    type: db.Sequelize.STRING,
    allowNull: false
  },
  wif: {
    type: db.Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Wallet;