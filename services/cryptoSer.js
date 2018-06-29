require('dotenv').config();

const crypto = require('crypto'),
  algorithm = 'aes-256-ctr',
  password = process.env.CRYPTO_SECRET,
  key = process.env.CRYPTO_KEY,
  inputEncoding = 'utf8',
  outputEncoding = 'hex';

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

module.exports.encryptIv = value => {
  const iv = new Buffer(crypto.randomBytes(16));
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let crypted = cipher.update(value, inputEncoding, outputEncoding);
  crypted += cipher.final(outputEncoding);
  return `${iv.toString('hex')}:${crypted.toString()}`;
};

module.exports.decryptIv  = value => {
  const textParts = value.split(':');
  //extract the IV from the first half of the value
  const IV = new Buffer(textParts.shift(), outputEncoding);
  //extract the encrypted text without the IV
  const encryptedText = new Buffer(textParts.join(':'), outputEncoding);
  //decipher the string
  const decipher = crypto.createDecipheriv(algorithm,key, IV);
  let decrypted = decipher.update(encryptedText,  outputEncoding, inputEncoding);
  decrypted += decipher.final(inputEncoding);
  return decrypted.toString();
};