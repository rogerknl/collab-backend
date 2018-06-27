const wallet = require (__dirname + '/../services/wallet');

const db = require (__dirname + '/../models/');

  // new wallet has
  // address:
  // privateKey:
  // privateKeyWIF:

exports.createWallet = async (ctx, next) => {
  const newWallet = wallet.createWallet();

  let result = await new Promise((resolve,reject)=>{
    db.User.findOne(
     {where: {username:ctx.user.username},
       attributes: ['id']
     }
   ).then((user)=>{
     db.Wallet.create({
         publickey: newWallet.address,
         privatekey: newWallet.privateKey,
         wif: newWallet.privateKeyWIF
       })
       .then((wallet)=>{
         db.UserWallet.create({
           user_id: user.dataValues.id,
           wallet_id: wallet.dataValues.publickey
         }).then(()=>resolve('DONE'));
       });
   });
  })
  ctx.body = {result};
};