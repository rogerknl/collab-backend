'use strict';
const db = require(__dirname + '/../db/sequelize');



const UserWallet = db.sequelize.define('USER_WALLET', {

});

module.exports = UserWallet;