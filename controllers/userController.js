'use strict';

const dbAccess = require( __dirname + '/../models/relations' );

exports.getAllUsers = async ctx => (ctx.body = await dbAccess.getAllUsers());
exports.createUser = async (ctx) => {
  await dbAccess.createUser(ctx.request.body);
  ctx.status = 201;
};