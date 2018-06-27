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
