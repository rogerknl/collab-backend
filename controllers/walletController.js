const wallet = require (__dirname + '/../services/wallet');


const db = require (__dirname + '/../models/');


exports.usersOfWallet = async ( pk ) => {
  let result = await new Promise((resolve,reject) => {
    db.User.findAll({
      include: [{
        model: db.UserWallet,
        where: {
          wallet_id: pk
        }
      }]
    }).then((users)=>{
      resolve(users.map((el)=>{
        return {
          'username': el.username
        };
      }));
    }).catch((err)=>reject(err));
  });
  return result;
};

exports.getWallets = async (ctx) => {
  let result = await new Promise((resolve,reject)=>{
    db.User.findOne(
      { where: {username:ctx.user.username},
        attributes: ['id']
      }
    ).then((user)=>{
      db.Wallet.findAll({
        include: [{
          model: db.UserWallet,
          where: {
            user_id: user.dataValues.id
          }
        }]
      }).then((wallets)=>{
        resolve(wallets.map((el)=>{
          return {
            'alias': el.alias,
            'publickey': el.publickey
          };
        }));
      }).catch((err)=>reject(err));
    });
  });
  for( let auxWallet of  result ) {
    auxWallet.balance = await wallet.getWalletBalance(auxWallet.publickey);
    auxWallet.users = await this.usersOfWallet( auxWallet.publickey );
  }
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