'use strict';
const router = require('koa-router')();

const userCont = require( __dirname + '/controllers/userController' );



router
  .get('/', (ctx,next)=>ctx.body = "hello world")
  .get('/user', userCont.getAllUsers)
  .post('/register',userCont.createUser);

module.exports = router;
