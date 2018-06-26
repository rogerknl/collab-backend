'use strict';
const bcrypt = require('bcrypt');

const db = require( __dirname + '/../models/' );
const filterProps = require('../services/utils').filterProps;

exports.getAllUsers = async ctx => {
  // ctx.body= await db.User.findAll({attributes: ['username', 'password']})
  // (ctx.body = await dbAccess.getAllUsers())
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
    ctx.body = await db.User.create(user);
    ctx.status = 201;
  }
};