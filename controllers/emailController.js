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

};