
const db = require (__dirname + '/../models/');


exports.usersOfWallet = async ( publickey ) => {
  let result = await new Promise((resolve,reject) => {
    db.User.findAll({
      include: [{
        model: db.UserWallet,
        where: {
          wallet_id: publickey
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

exports.addUserToWallet = async (ctx) => {
  //check if user to add exists
  const userToAdd = await db.User.findOne({ where:
     {username:ctx.request.body.username},
  attributes: ['id']
  });
  if (!userToAdd) return ctx.body = {error: 'User not found'};

  //get id of userAuth
  const userAuth = await db.User.findOne(
    { where: {username:ctx.user.username},
      attributes: ['id']
    }
  );
  //check if userAuth has rights over this wallet
  const uWauth = await db.UserWallet.findOne({
    where: {user_id: userAuth.id, wallet_id: ctx.request.body.publickey}
  });
  if (!uWauth) return ctx.body = {error: 'User has not rights over this Wallet'};

  //check id userToAdd was previously added
  const alreadyExists = await db.UserWallet.findOne({
    where: {user_id: userToAdd.id, wallet_id: ctx.request.body.publickey}
  });
  if (alreadyExists) return ctx.body = {error: 'User already has rights over this Wallet'};

  //now addding user to add
  const result = await db.UserWallet.create({
    user_id: userToAdd.id,
    wallet_id: ctx.request.body.publickey
  });
  if(result) return 'DONE';
  ctx.body = {error: 'DB error on inserting'};
};