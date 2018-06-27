'use strict';
const router = require('koa-router')();
const authorize = require(__dirname + '/middleware/auth');

const userCont = require( __dirname + '/controllers/userController' );
const walletCont = require( __dirname + '/controllers/walletController' );

router
  //temporal routes
  .get('/', (ctx,next)=>ctx.body = 'hello world')
  .get('/user', authorize, (ctx,next)=>ctx.body='hey')

  //app routes
  .post('/wallet', authorize, walletCont.createWallet)
  .post('/login', userCont.signIn)
  .post('/register',userCont.createUser);

module.exports = router;
