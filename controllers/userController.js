'use strict';

const db = require( __dirname + '/../models/' );

exports.getAllUsers = async ctx => {
  // ctx.body= await db.User.findAll({attributes: ['username', 'password']})
  // (ctx.body = await dbAccess.getAllUsers())
};
exports.createUser = async (ctx) => {
  await dbAccess.createUser(ctx.request.body);
  ctx.status = 201;
};