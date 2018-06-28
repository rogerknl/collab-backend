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
  let userId = await db.User.findOne({ where:
  { username:ctx.user.username},
  attributes: ['id']
  });
  ctx.body = userId;
};