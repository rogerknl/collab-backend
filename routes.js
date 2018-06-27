'use strict';
const router = require('koa-router')();
const authorize = require(__dirname + '/middleware/auth');

const userCont = require( __dirname + '/controllers/userController' );
const walletCont = require( __dirname + '/controllers/walletController' );
const userWalletCont = require( __dirname + '/controllers/userWalletController' );
const operCont = require( __dirname + '/controllers/operationController' );

router
  .get('/wallet', authorize, walletCont.getWallets)
  .post('/wallet/add_user',authorize, userWalletCont.addUserToWallet)
  .post('/operations', authorize, operCont.createOperation)
  .post('/wallet', authorize, walletCont.createWallet)
  .post('/login', userCont.signIn)
  .post('/register',userCont.createUser);

module.exports = router;
