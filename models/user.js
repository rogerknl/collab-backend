'use strict';
const db = require(__dirname + '/../db/sequelize');



const User = db.sequelize.define('USER', {
  iduser: {
    type: db.Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    unique: true,
    primaryKey: true },
  username: {
    type: db.Sequelize.STRING,
    allowNull: false,
    unique: true },
  password: {
    type: db.Sequelize.STRING,
    allowNull: false,
    unique: true },
  email: {
    type: db.Sequelize.STRING,
    allowNull: false},
  publickey: {
    type: db.Sequelize.STRING,
    allowNull: true,
    },
})
// //User.hasMany(UserWallet, {as: 'uw_wallet_id', foreignKey: 'uw_wallet_id'})
// User.belongsToMany(db.sequelize.Wallet, { through: db.sequelize.UserWallet });

module.exports = User;