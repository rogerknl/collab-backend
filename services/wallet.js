const bitcore = require('bitcore-lib');
delete global._bitcore; // workaround to resolve double instance of bitcore-lib
const Insight = require('bitcore-explorers').Insight;
const insight = new Insight('testnet');

const promisify = require('../services/promisify')
const bitcoinNet = process.env.BITCOIN_NET || 'testnet';

/**
 * Create a wallet with random address.
 *
 * Uses testnet as default.
 * To operate with real BTC in the livenet write BITCOIN_NET=livenet in .env file.
 *
 * @function createWallet
 * @return {{address: string, privateKey: string, privateKeyWIF: string}}
 * - An object with 3 properties of the new wallet: address, privateKey and privateKeyWIF.
 */

module.exports.createWallet = () => {
 const privateKeyWIF = bitcore.PrivateKey(bitcoinNet).toWIF();
 const privateKey = bitcore.PrivateKey.fromWIF(privateKeyWIF);
 const address = privateKey.toAddress();

 return {
   address: address.toString(),
   privateKey: privateKey.toString(),
   privateKeyWIF: privateKeyWIF.toString()
 }
}

/**
 * Get the total amount of satoshis available in the wallet.
 *
 * @async
 * @function getWalletBalance
 * @param {string} walletAddress - the public address of the wallet.
 * e.g. 'mrcDTLhJKA1tD2J9u8LRChYXpscMNw2Pq4'
 * @return {Promise} - Promise that resolves in a number representing
 * the total remaining balance in the wallet.
 */

module.exports.getWalletBalance = async (emisor) => {
 try {
   insight.getUnspentUtxosPromise = promisify(insight, insight.getUnspentUtxos);
   const utxos = await insight.getUnspentUtxosPromise(emisor);

   return utxos.reduce((acc,utxo) => acc + utxo.satoshis, 0)
 } catch (e) {
   console.error(e);
 }
}

/**
 * Get the Unspent Transaction Outputs of the wallet.
 *
 * @async
 * @function getUTXOS
 * @param {string} walletAddress - the public address of the wallet.
 * e.g. 'mrcDTLhJKA1tD2J9u8LRChYXpscMNw2Pq4'
 * @return {Promise} - Promise that resolves in an object representing
 * the UTXOS of the wallet.
 */

module.exports.getUTXOS = async (emisor) => {
 try {
   insight.getUnspentUtxosPromise = promisify(insight, insight.getUnspentUtxos);
   const utxos = await insight.getUnspentUtxosPromise(emisor);

   return utxos
 } catch (e) {
   console.error(e);
 }
}

/**
 * Make a transaction between to addresses.
 *
 * @async
 * @function makeTransaction
 * @param {string} emisor - public address of sender.
 * e.g. 'mxStSTMNtfeu3tWhw42yfK7M47768JSD2n'
 * @param {string} privateKey - private key of sender.
 * e.g. 'd3702bda370f806a5e3a35da1830ec87ab9e3558024d8040858977ad6f47265e'
 * @param {string} receptor - public address of receiver.
 * e.g. 'mfY6J8ksFr2oiaccEJWKhgQa2aJA1J8rFd'
 * @param {number} amount - number of satoshis to send.
 * NOTE: 1 Bitcoin(BTC) = 100,000,000 Satoshi
 * @param {number} fee - number of satoshis that the miner will keep.
 * NOTE: 1 Bitcoin(BTC) = 100,000,000 Satoshi
 * @return {Promise} - Promise that resolves in a string representing
 * the transaction ID. e.g. 255596a9d5084ab2064cd62422768f3b47d808bd0d129097eb7b878c971776a6
 * Transaction ID can be then pasted and looked up in sites like https://chain.so/
 */

module.exports.makeTransaction = async (
  emisor, privateKey, receptor, amount, fee = process.env.BITCOIN_MINER_FEE || 1000) => {
 try {
   insight.getUnspentUtxosPromise = promisify(insight, insight.getUnspentUtxos);
   insight.broadcastPromise = promisify(insight, insight.broadcast);
   const utxos = await insight.getUnspentUtxosPromise(emisor);
   const tx = bitcore.Transaction();
   tx.from(utxos);
   tx.to(receptor, amount);
   tx.change(emisor);
   tx.fee(fee)
   tx.sign(privateKey)
   tx.serialize()

   return insight.broadcastPromise(tx.serialize());
 } catch (e) {
   console.error(e);
 }
}
