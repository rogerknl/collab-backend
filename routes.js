'use strict';
const router = require('koa-router')();
const authorize = require(__dirname + '/middleware/auth');

const userCont = require( __dirname + '/controllers/userController' );
const walletCont = require( __dirname + '/controllers/walletController' );
const userWalletCont = require( __dirname + '/controllers/userWalletController' );
const operCont = require( __dirname + '/controllers/operationController' );
const voteCont = require( __dirname + '/controllers/voteController' );




router
  .get('/txTest/:acc',authorize, walletCont.registerTxInbound)
  .get('/vote', authorize, voteCont.getVotes)
  .get('/wallet', authorize, walletCont.getWallets)
  .get('/operations/history', authorize, operCont.getOperationHistory)
  .get('/operations/history/:wallet_id', authorize, operCont.getOperationHistoryWid)
  .get('/operations/:operation_id',authorize, operCont.getOperation)
  .post('/vote', authorize, voteCont.vote)
  .post('/wallet/add_user',authorize, userWalletCont.addUserToWallet)
  .post('/operations', authorize, operCont.createOperation)
  .post('/wallet', authorize, walletCont.createWallet)
  .post('/login', userCont.signIn)
  .post('/register',userCont.createUser);

module.exports = router;
