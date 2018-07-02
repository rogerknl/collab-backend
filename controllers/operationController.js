'use strict';
const sendMail = require(__dirname + '/../services/mailer');
const wallet = require(__dirname + '/../services/wallet');
const uWalletCont = require(__dirname + '/userWalletController');
const db = require( __dirname + '/../models/' );

const cryptoSer = require( __dirname + '/../services/cryptoSer');

module.exports.executeOperation = async ( oId, votes) => {
  let txRes;
  const operation = await db.Operation.findOne({where:
  { id: oId}
  });
  const result = await operation.updateAttributes({
    result: 'Approved',
    closed_at: Date.now()
  });
  if (result) {
    const uw = await db.UserWallet.findOne({ where:
      {id: result.dataValues.userwallet_id}
    });
    const w = await db.Wallet.findOne({ where:
      {publickey: uw.dataValues.wallet_id}
    });
    if ( result.dataValues.type === 'adduser' ) {
      uWalletCont.addUserToWallet(result.dataValues.user_to_act, w.dataValues.publickey);
    }
    else {
      txRes = await wallet.makeTransaction(
        w.dataValues.publickey,
        cryptoSer.decryptIv(w.dataValues.privatekey),
        operation.dataValues.target,
        operation.dataValues.amount
      );
      if (txRes) {
        const trans = await db.Transaction.create({
          type:'outbound',
          amount: operation.dataValues.amount,
          counter_party: operation.dataValues.target,
          transaction_str: txRes,
          operation_id: operation.dataValues.id,
          wallet_id: w.dataValues.publickey,
          date: Date.now()
        });
        if (!trans) sendMail.failedRecordingTransaction({
          type:'outbound',
          amount: operation.dataValues.amount,
          counter_party: operation.dataValues.target,
          transaction_str: txRes,
          operation_id: operation.dataValues.id,
          wallet_id: w.dataValues.publickey
        });
      }
    }
    for (let vote of votes){
      const user = await db.User.findOne({
        include: [{
          model: db.UserWallet,
          where: {
            id: vote.dataValues.userwallet_id
          }
        }]
      });
      if (txRes || result.dataValues.type === 'adduser') sendMail.operationApproved(user.dataValues.email,operation.dataValues.message);
      else sendMail.operationApprovedButfailed(user.dataValues.email,operation.dataValues.message);
    }
  }
};

module.exports.rejectOperation = async ( oId, votes) => {
  const operation = await db.Operation.findOne({where:
  { id: oId}
  });
  const result = await operation.updateAttributes({
    result: 'Rejected',
    closed_at: Date.now()
  });
  if (result) {
    for (let vote of votes){
      const user = await db.User.findOne({
        include: [{
          model: db.UserWallet,
          where: {
            id: vote.dataValues.userwallet_id
          }
        }]
      });
      sendMail.opearionRejected(user.dataValues.email,operation.dataValues.message);
    }
  }
};

module.exports.getOperationHistoryWid = async (ctx) => {
  const uw = await db.User.findOne({where:
    {username: ctx.user.username},
  include: [
    {
      model: db.UserWallet,
      where: {wallet_id: ctx.params.wallet_id},
    }
  ]
  });
  if (!uw) return ctx.body = {error: 'User has no right over this wallet'};


  const operations = await db.Operation.findAll({
    where: {
      $or:[
        {result: 'Approved'},
        {result: 'Rejected'}
      ]},
    include: [
      {
        model: db.Vote,
        where: {
          userwallet_id: uw.dataValues.UserWallets[0].dataValues.id,
        }
      }
    ]
  });
  let result =[];
  for (let operation of operations) {
    let votingState = 0;
    if (operation.dataValues.Votes[0].dataValues.value) votingState = operation.dataValues.Votes[0].dataValues.value;
    let pendingOp = {
      publicKey: ctx.params.wallet_id,
      message: operation.dataValues.message,
      amount: operation.dataValues.amount,
      target: operation.dataValues.target,
      result: operation.dataValues.result,
      operation_id: operation.dataValues.id,
      votingState: votingState,
      closed_at: operation.closed_at
    };
    result.push(pendingOp);
  }
  ctx.jwt.modified = true;
  ctx.body = result;
};

module.exports.getAllOperationsWallet = async ( key ) => {
  const result = [];
  const operations = await db.Operation.findAll({
    include: [{
      model: db.UserWallet,
      where: {
        wallet_id: key
      }
    }]
  });
  for (let op of operations) {
    const votes = await db.Vote.findAll({
      where: {operation_id:op.dataValues.id}
    });
    const numberOfUsers = votes.length;
    let numberOfVotes = 0;
    for (let vote of votes) {
      if (vote.dataValues.value) numberOfVotes ++;
    }

    const opToPush  = {
      publicKey: key,
      message: op.dataValues.message,
      amount: op.dataValues.amount,
      target: op.dataValues.target,
      result: op.dataValues.result,
      operation_id: op.dataValues.id,
      numberOfVotes: numberOfVotes,
      numberOfUsers: numberOfUsers,
      closed_at: op.closed_at
    };
    result.push(opToPush);
  }
  return result;
};

module.exports.getOperationHistory = async (ctx) => {
  const operations = await db.Operation.findAll({
    where: {
      $or:[
        {result: 'Approved'},
        {result: 'Rejected'}
      ]},
    include: [
      {
        model: db.Vote,
        include: [
          {
            model: db.UserWallet,
            include: [
              {
                model: db.User,
                where: {username: ctx.user.username},
              }
            ]
          }
        ]
      }
    ]
  });
  let result =[];
  for (let operation of operations) {
    let numberOfVotes = 0;
    let votingState = 0;
    let publicKey = '';
    for (let vote of operation.dataValues.Votes) {
      if (vote.dataValues.UserWallet) {
        publicKey = vote.dataValues.UserWallet.dataValues.wallet_id;
        if (vote.dataValues.value) votingState = vote.dataValues.value;
      }
      if (vote.dataValues.value) numberOfVotes ++;
    }
    let pendingOp = {
      publicKey: publicKey,
      message: operation.dataValues.message,
      amount: operation.dataValues.amount,
      target: operation.dataValues.target,
      result: operation.dataValues.result,
      operation_id: operation.dataValues.id,
      votingState: votingState,
      numberOfVotes: numberOfVotes,
      numberOfUsers: operation.dataValues.Votes.length,
      closed_at: operation.closed_at
    };
    result.push(pendingOp);
  }
  ctx.jwt.modified = true;
  ctx.body = result;
};

module.exports.getOperation = async (ctx) => {
  //get de UserAuth Id
  const userId = await db.User.findOne({ where:
    { username:ctx.user.username},
  attributes: ['id']
  });

  //get all votes of this operation
  const votes = await db.UserWallet.findAll({
    include: [{
      model: db.Vote,
      where: {
        operation_id: ctx.params.operation_id
      }
    }]
  });
  let userHasRights = false;
  let numberOfUsers = votes.length;
  let numberOfVotes = 0;
  let valueOfVote = 0;
  for (let el of votes) {
    if (el.user_id === userId.id){
      userHasRights = true;
      if (el.Votes[0].value) valueOfVote = el.Votes[0].value;
    }
    else if(el.Votes[0].value) numberOfVotes++;
  }
  if (!userHasRights) ctx.body = {error: 'User has no rights over this operation '};

  //get info of this operation
  const operation = await db.Operation.findOne({where:
    {id:ctx.params.operation_id},
  attributes: ['target','amount','message','result']
  });

  //send the info to the frontend
  ctx.jwt.modified = true;
  ctx.body = {...operation.dataValues,'numberOfVotes':numberOfVotes,'numberOfUsers':numberOfUsers,'valueOfVote':valueOfVote};
};

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

  console.log(ctx.request.body.username)
  console.log(ctx.request.body.publicKey)
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
  let type;
  switch (ctx.url) {
  case '/wallet/add_user':
    type = 'adduser';
    break;
  default:
    type = 'transfer';
  }

  let operation = null ;

  if (type === 'adduser') {
    const uExist = await db.User.findOne({
      where: {username:ctx.request.body.username}
    });
    if (!uExist) return ctx.body = {error:'This user not exist'};
    operation = await db.Operation.create({
      type: type,
      message: ctx.request.body.message,
      userwallet_id: userWalletId.id,
      user_to_act: ctx.request.body.username
    });
  } else {
    operation = await db.Operation.create({
      type: type,
      target: ctx.request.body.target_publicAdress,
      amount: ctx.request.body.amount,
      message: ctx.request.body.message,
      userwallet_id: userWalletId.id
    });
  }

  if (!operation) return ctx.body = {error: 'DB error on inserting'};
  //create all votes for this operation
  let error = await this.createVotes(ctx, operation.dataValues.id, ctx.request.body.publicKey, ctx.request.body.message);
  if (!error){
    ctx.jwt.modified = true;
    return ctx.body = {msg: 'Operation and votes created'};
  }
  ctx.body = {error: 'DB error on inserting votes'};
};