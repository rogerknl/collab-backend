const wallet = require (__dirname + '/../services/wallet');

const cryptoSer = require( __dirname + '/../services/cryptoSer');
const userWallet = require ( __dirname + '/userWalletController');
const db = require (__dirname + '/../models/');

exports.getTxFromWallet = async ( ctx ) => {
  const userId = await db.User.findOne({
    where: {username: ctx.user.username}
  });
  const userWallet = await db.UserWallet.findOne({
    where: {user_id: userId.id, wallet_id: ctx.params.walletid}
  });
  if (!userWallet) return ctx.body = {error: 'User has no rights over this wallet'};
  const tx = await db.Transaction.findAll({
    where: {wallet_id:ctx.params.walletid},
    order: [['DATE', 'DESC']],
    include: [{
      model: db.Operation,
    }]
  });
  const result =[];
  for ( let txi of tx ) {
    let msg = null;
    if (txi.dataValues.Operation) msg = txi.dataValues.Operation.dataValues.message;
    result.push({
      type: txi.dataValues.type,
      amount: txi.dataValues.amount,
      counter_party: txi.dataValues.counter_party,
      transaction_str: txi.dataValues.transaction_str,
      date: txi.dataValues.date,
      message: msg
    });
  }
  ctx.body = result;
};

exports.registerTxInbound = async (ctx, walletid ) => {
  //take the last inbound tx in the db
  const txR = await db.Transaction.findOne({
    where:{
      wallet_id: walletid,
      type: 'inbound'
    },
    order: [['DATE', 'DESC']]
  });
  let tx;
  if ( !txR ) tx = await wallet.getInbTransactions(walletid);
  else tx = await wallet.getInbTransactions(walletid,txR.dataValues.transaction_str);

  const result = [];
  for(let txi of tx ) {
    const txToRecord = {
      type: 'inbound',
      amount: txi.value,
      transaction_str: txi.txid,
      date: new Date(txi.time),
      wallet_id: walletid
    };
    await db.Transaction.create(txToRecord);
    result.push(txToRecord);
  }
};

exports.getWallets = async (ctx) => {
  const userId = await db.User.findOne(
    { where: {username:ctx.user.username},
      attributes: ['id']
    });

  const wallets = await db.Wallet.findAll({
    include: [{
      model: db.UserWallet,
      where: {
        user_id: userId.dataValues.id
      }
    }]
  });
  if(!wallets) return ctx.body = {wallets:[]};
  const result = wallets.map(
    (el)=>{
      return {
        'alias': el.alias,
        'publickey': el.publickey,
        'createdAt': el.createdAt
      };
    });
  for( let auxWallet of  result ) {
    //this.registerTxInbound(ctx, auxWallet.publickey);
    auxWallet.balance = await wallet.getWalletBalance(auxWallet.publickey);
    auxWallet.users = await userWallet.usersOfWallet( auxWallet.publickey );
  }
  ctx.jwt.modified = true;
  ctx.body = {wallets:result};
};


exports.createWallet = async (ctx) => {
  if (!ctx.request.body.alias) return ctx.body = {ERROR: 'Missing alias'};
  const newWallet = wallet.createWallet();
  const userId = await db.User.findOne(
    { where: {username:ctx.user.username},
      attributes: ['id']
    });

  const w = await db.Wallet.create({
    publickey: newWallet.address,
    privatekey: cryptoSer.encryptIv(newWallet.privateKey),
    wif: newWallet.privateKeyWIF,
    alias: ctx.request.body.alias
  });
  const uw = db.UserWallet.create({
    user_id: userId.dataValues.id,
    wallet_id: w.dataValues.publickey
  });

  if(!uw) ctx.body = {error: 'Error on creating the wallet'};
  ctx.jwt.modified = true;
  ctx.body = {result:'DONE'};
};