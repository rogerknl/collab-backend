'use strict';

const db = require(__dirname + '/../db/sequelize');

const Vote = db.sequelize.define('VOTE', {
  value: {
    type: db.Sequelize.STRING
  }
});
module.exports = Vote;