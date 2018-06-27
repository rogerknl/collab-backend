'use strict';
const bcrypt = require('bcrypt');
const atob = require('atob');

const db = require( __dirname + '/../models/' );
const filterProps = require('../services/utils').filterProps;

exports.getAllUsers = async ctx => {
  // ctx.body= await db.User.findAll({attributes: ['username', 'password']})
  // (ctx.body = await dbAccess.getAllUsers())
};


module.exports.signIn = async (ctx, next) => {
  const auth = ctx.request.headers.authorization.split(' ');
  const decoded = atob(auth[1]).split(/:(.+)/);
  let user = await db.User.findOne({where: {username:decoded[0]}});
  if (user) {
    const match = await bcrypt.compare(decoded[1], user.password);
    if (match) {
      ctx.user = {};
      ctx.user['username'] = user.username;
      ctx.jwt.modified = true;
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
    ctx.body = { username: userData.username, email:userData.email}
    ctx.user = { username: userData.username};
    ctx.jwt.modified = true;
    ctx.status = 201;
  }
};