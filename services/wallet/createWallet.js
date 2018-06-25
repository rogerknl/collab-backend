// createWallet()
//
// Return value:
// An object with 3 properties of the new wallet: address, privateKey and privateKeyWIF
//
// NOTE: to access properties use toString() method.
// e.g. to log privateKey -> console.log(createWallet().PrivateKey.toString());

const bitcore = require('bitcore-lib');

// Uses testnet as default.
// To operate with real BTC in the livenet write BITCOIN_NET=livenet in .env file.
const bitcoinNet = process.env.BITCOIN_NET || 'testnet';

module.exports = createWallet = () => {
  const privateKeyWIF = bitcore.PrivateKey(bitcoinNet).toWIF();
  const privateKey = bitcore.PrivateKey.fromWIF(privateKeyWIF);
  const address = privateKey.toAddress();

  return {
    address,
    privateKey,
    privateKeyWIF
  }
}


// TODO: npm uninstall bitcoinjs-lib
// TODO: process.env.BITCOIN_NET
// TODO: check if devdependencies should be normal dependencies
