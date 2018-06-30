'use strict';
const bcrypt = require('bcrypt');
const atob = require('atob');


const db = require( __dirname + '/../models/' );
const filterProps = require(__dirname + '/../services/utils').filterProps;
const mailCont = require(__dirname + '/emailController');


module.exports.signIn = async (ctx) => {
  const auth = ctx.request.headers.authorization.split(' ');
  const decoded = atob(auth[1]).split(/:(.+)/);
  let user = await db.User.findOne({where: {username:decoded[0]}});
  if (user) {
    const match = await bcrypt.compare(decoded[1], user.password);
    if (match) {
      ctx.user = {};
      ctx.user['username'] = user.username;
      ctx.jwt.modified = true;
      ctx.body = {username: user.username, email: user.email, firstname: user.firstname };
      ctx.status = 200;
    } else ctx.status = 401;
  } else ctx.status = 401;
};


exports.createUser = async (ctx, next) => {
  const salt = 10;
  if ('POST' != ctx.method) return await next();
  const userData = ctx.request.body;
  let user = await db.User.findOne({where :{username:userData.username}});
  if (user) {
    ctx.status = 400;
    ctx.body = {
      errors:[
        'Username already exists.'
      ]
    };
  } else {
    user = filterProps(userData, ['username','password','firstname','lastname','email','publickey']);
    user['password'] = await bcrypt.hash(user.password, salt)
      .then((hash) => hash);
    await db.User.create(user);
    mailCont.sendValidEmail(ctx, userData);
    ctx.body = { username: userData.username, email:userData.email };
    ctx.user = { username: userData.username};
    ctx.jwt.modified = true;
    ctx.status = 201;
  }
};