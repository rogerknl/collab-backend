const wallet = require (__dirname + '/../services/wallet');

const db = require (__dirname + '/../models/');

exports.getWallets = async (ctx) => {

  let result = await new Promise((resolve,reject)=>{
    db.User.findOne(
      { where: {username:ctx.user.username},
        attributes: ['id']
      }
    ).then((user)=>{
      db.UserWallet.findAll({
        where: {
          user_id: user.dataValues.id
        },
        attributes: ['wallet_id']
      }).then((wallets)=>{
        resolve(wallets.map(el=>el.wallet_id));
      }).catch((err)=>reject(err));
    });
  });
  ctx.jwt.modified = true;
  ctx.body = {wallets:result};
};

exports.createWallet = async (ctx) => {
  const newWallet = wallet.createWallet();
  if (!ctx.request.body.alias) return ctx.body = {ERROR: 'Missing alias'};

  let result = await new Promise((resolve,reject)=>{
    db.User.findOne(
      { where: {username:ctx.user.username},
        attributes: ['id']
      }
    ).then((user)=>{
      db.Wallet.create({
        publickey: newWallet.address,
        privatekey: newWallet.privateKey,
        wif: newWallet.privateKeyWIF,
        alias: ctx.request.body.alias
      })
        .then((wallet)=>{
          db.UserWallet.create({
            user_id: user.dataValues.id,
            wallet_id: wallet.dataValues.publickey
          }).then(()=>resolve('DONE'))
            .catch((err)=>reject(err));
        });
    });
  });
  ctx.jwt.modified = true;
  ctx.body = {result};
};