require('dotenv').config();

const crypto = require('crypto'),
  algorithm = 'aes-256-ctr',
  password = process.env.CRYPTO_SECRET;

module.exports.encrypt = (str) => {
  const cipher = crypto.createCipher(algorithm,password);
  let crypted = cipher.update(str,'utf8','hex');
  crypted += cipher.final('hex');
  return crypted;
};

module.exports.decrypt = (str) => {
  const decipher = crypto.createDecipher(algorithm,password);
  let dec = decipher.update(str,'hex','utf8');
  dec += decipher.final('utf8');
  return dec;
};