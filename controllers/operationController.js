'use strict';


const db = require( __dirname + '/../models/' );
const filterProps = require('../services/utils').filterProps;

/*
{
    "publicKey" : "as02018181",
    "message": "message describing the purpose of the operation",
    "amount": 0.4,
    "target_publicAdress": "12kdeo12344",
}
*/
module.exports.createOperation = async (ctx) => {
  let result = await new Promise((resolve,reject)=>{
    db.User.findOne(
      { where: {username:ctx.user.username},
        attributes: ['id']
      }
    ).then((user)=>{
      resolve(user);
    });
  });
  ctx.body = result;
};