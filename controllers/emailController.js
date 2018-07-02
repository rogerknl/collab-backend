'use strict';
const sendMail = require(__dirname + '/../services/mailer');
const cryptoSer = require( __dirname + '/../services/cryptoSer');
const db = require( __dirname + '/../models/' );
const cacheEmail = require(__dirname + '/../services/cacheEmail');

const uuidv4 = require('uuid/v4');

module.exports.sendValidEmail = async ( ctx, userData ) => {
  let uuid;
  let exist;
  do {
    uuid = uuidv4();
    exist = await cacheEmail.getCache(uuid);
  } while(exist);
  sendMail.emailValidtor(userData, process.env.FRONTEND_URL + '/emailVal/' + uuid );
  cacheEmail.setCache( uuid, JSON.stringify({username:userData.username}));
};


module.exports.sendVoteEmail = async ( ctx, userData, msg, uwId, opId) => {
  const url = process.env.FRONTEND_URL;
  let ok;
  let ko;
  let exist;
  do {
    ok = uuidv4();
    exist = await cacheEmail.getCache(ok);
  } while(exist);
  do {
    ko = uuidv4();
    exist = await cacheEmail.getCache(ko);
  } while(exist);
  await cacheEmail.setCache( ok, JSON.stringify({
    username:userData.username,
    operation_id: opId,
    userWallet_id: uwId,
    value: 1,
    koCache: ko
  }));
  await cacheEmail.setCache( ok, JSON.stringify({
    username:userData.username,
    operation_id: opId,
    userWallet_id: uwId,
    value: 2,
    koCache: ok
  }));
  sendMail.readyToVote(userData, msg, url + '/emailVote/' + ok, url + '/emailVote/' + ko);
};


module.exports.checkValidEmail = async ( ctx ) => {
  const result = await cacheEmail.getCache( ctx.params.key );
  if (result) {
    const user = await db.User.findOne({
      where: {username: JSON.parse(result.data).username}
    });
    if (user) {
      const updated = await user.update({
        valid_email: true
      });
      if (updated) {
        cacheEmail.delFromCache(ctx.params.key);
        return ctx.body = `
        <h1>Thanks for validate your email</h1>
        `;
      }
    }
    ctx.body = `
    <h1>Error on the validation process</h1>
    `;
  }
};
module.exports.voteEmail = async ( ctx ) => {
  const key = ctx.params.key;

  let result = await cacheEmail.getCache( key );
  if (result) {
    result = JSON.parse(result.data);
    const vote = await db.Vote.findOne({
      where: {
        operation_id: result.operation_id,
        userwallet_id: result.userwallet_id,
      }
    });
    if (!vote) return console.log({error: 'Vote no valid'});
    const updated = vote.update({
      value: result.value
    });
    if (updated) {
      cacheEmail.delFromCache(key);
      if (result.value === 1) cacheEmail.delFromCache(result.koCache);
      else cacheEmail.delFromCache(result.okCache);
      return ctx.body = `
        <h1>Thanks for vote</h1>
        `;
    }
    ctx.body = `
    <h1>Error on the voting process</h1>
    `;
  }
};