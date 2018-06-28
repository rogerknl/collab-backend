'use strict';
const sendMail = require(__dirname + '/../services/mailer');

const db = require( __dirname + '/../models/' );


module.exports.createVotes = async (ctx, opId, wId, opMsg) => {
  let error = false;
  let uwIds = await db.UserWallet.findAll({where:
    {wallet_id: wId}
  });
  for ( let uw of uwIds) {
    let vote = await db.Vote.create({
      userwallet_id: uw.dataValues.id,
      operation_id: opId
    });
    let user = await db.User.findOne({where:
      {id: uw.dataValues.user_id}
    });
    sendMail.readyToVote(user.dataValues,opMsg);
    if (!vote) error = true;
  }
  return error;
};

module.exports.createOperation = async (ctx) => {
  //get userAuth Id
  let userId = await db.User.findOne({ where:
  { username:ctx.user.username},
  attributes: ['id']
  });
  //get id of UserWallet relation
  let userWalletId = await db.UserWallet.findOne({ where:
  { user_id: userId.id, wallet_id: ctx.request.body.publicKey },
  attributes: ['id']
  });
  if (!userWalletId) return ctx.body = {error: 'User has no rights over this wallet'};
  //create the operation
  let operation = await db.Operation.create({
    target: ctx.request.body.target_publicAdress,
    amount: ctx.request.body.amount,
    message: ctx.request.body.message,
    userwallet_id: userWalletId.id
  });
  if (!operation) return ctx.body = {error: 'DB error on inserting'};
  //create all votes for this operation
  let error = await this.createVotes(ctx, operation.dataValues.id, ctx.request.body.publicKey, ctx.request.body.message);
  if (!error) return ctx.body = {msg: 'Operation and votes created'};

  ctx.body = {error: 'DB error on inserting votes'};
};