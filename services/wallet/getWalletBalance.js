// getWalletBalance(walletAddress)
//
// walletAddress<str>: the public address of the wallet. e.g. 'mrcDTLhJKA1tD2J9u8LRChYXpscMNw2Pq4'
//
// Return value<int>: the total remaining balance in the wallet.

const Insight = require('bitcore-explorers').Insight;
const insight = new Insight('testnet');

const promisify = (fn) => (...args) => new Promise((resolve, reject) => {
  fn.apply(insight, [...args, (err, ...args) => {
    if (err) return reject(err);
    resolve.apply(this, args);
  }]);
});

insight.getUnspentUtxosPromise = promisify(insight.getUnspentUtxos);

module.exports = getWalletBalance = async (emisor) => {
  try {
    const utxos = await insight.getUnspentUtxosPromise(emisor);

    return utxos.reduce((acc,utxo) => acc + utxo.satoshis, 0)
  } catch (e) {
    console.error(e);
  }
}
