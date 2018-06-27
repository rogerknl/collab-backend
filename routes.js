'use strict';
const router = require('koa-router')();
const authorize = require(__dirname + '/middleware/auth');

const userCont = require( __dirname + '/controllers/userController' );
const walletCont = require( __dirname + '/controllers/walletController' );

router
  .post('/wallet', authorize, walletCont.createWallet)
  .post('/login', userCont.signIn)
  .post('/register',userCont.createUser);

module.exports = router;
