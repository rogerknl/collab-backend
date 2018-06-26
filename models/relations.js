const db = require(__dirname + '/../db/sequelize');

const Addressbook = require(__dirname + '/addressbook');
const Transaction = require(__dirname + '/transaction');
const Operation = require(__dirname + '/operation');
const User = require(__dirname + '/user');
const Vote = require(__dirname + '/vote');
const Wallet = require(__dirname + '/wallet');
const UserWallet = require(__dirname + '/userwallet');


// 1-n rel wallet
Wallet.hasMany(Addressbook, {as: 'ab_wallet_id', foreignKey: 'ab_wallet_id'});
Wallet.hasMany(Transaction, {as: 't_wallet_id', foreignKey: 't_wallet_id'});


// n-m rel wallet user
Wallet.belongsToMany(User, { through: UserWallet });
User.belongsToMany(Wallet, { through: UserWallet });

// 1-n rel UW to Operation
UserWallet.hasMany(Operation, {foreignKey: 'wallet_id', sourcekey:'WALLETPublickey'})
Operation.belongsTo(UserWallet, {foreignKey: 'wallet_id', targetKey: 'WALLETPublickey'});
UserWallet.hasMany(Operation, {foreignKey: 'creator_id', sourceKey: 'USERIduser'});
Operation.belongsTo(UserWallet, {foreignKey: 'creator_id', targetKey: 'USERIduser'});

//0-n rel Operation to transaction
Operation.hasMany(Transaction, {as: 'fromoperation', foreignkey: 'fromoperation'})

//1-n rel UW to vote
UserWallet.hasMany(Vote, {foreignKey: 'wallet_id', sourcekey:'WALLETPublickey'})
Vote.belongsTo(UserWallet, {foreignKey: 'wallet_id', targetKey: 'WALLETPublickey'});
UserWallet.hasMany(Vote, {foreignKey: 'creator_id', sourceKey: 'USERIduser'});
Vote.belongsTo(UserWallet, {foreignKey: 'creator_id', targetKey: 'USERIduser'});



// db.sequelize.sync();
