'use strict';

const db = require(__dirname + '/../db/sequelize');

const Addressbook = db.sequelize.define('ADDRESSBOOK', {
  id: {
    type: db.Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    unique: true,
    primaryKey: true
  },
  publickey: {
    type: db.Sequelize.STRING,
    allowNull: false
  },
  name: {
    type: db.Sequelize.STRING,
    allowNull: false
  },
});

module.exports = Addressbook;