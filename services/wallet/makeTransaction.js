// makeTransaction(emisor, privateKey, receptor, amount, fee)
//
//  emisor <str>: public address of sender e.g. 'mxStSTMNtfeu3tWhw4eyfK7M47768JSD2n'
//  privateKey <str>: private key of sender e.g. 'd3702bda370f806a5e3a35da1830ec87ab9e3558024d8040858977ad6247265e'
//  receptor <str>: public address of receiver e.g. 'mfY6J8ksFr2oiaccEJWKhgQa2aJALJ8rFd'
//  amount <int>: number of satoshis to send. (1 Bitcoin(BTC) = 100,000,000 Satoshi )
//  fee <int>: number of satoshis that the miner will take as 'tip'
//    for mining this transaction. Should be at least as the current estimates.
//    Estimates can be checked googling 'bitcoin current fee estimates'
//    or at pages like https://live.blockcypher.com/btc-testnet/
//
//  Return value: a PROMISE that resolves as a string with the transaction id.
//  e.g. 255596a9d5084ab2064cd62422768f3b47d808bd0d129097eb7b878c971776a6
//
//  Transaction ID can be then pasted and looked up in sites like https://chain.so/

const bitcore = require('bitcore-lib');
delete global._bitcore; // workaround to resolve double instance of bitcore-lib
const Insight = require('bitcore-explorers').Insight;
const insight = new Insight('testnet');

const promisify = (fn) => (...args) => new Promise((resolve, reject) => {
  fn.apply(insight, [...args, (err, ...args) => {
    if (err) return reject(err);
    resolve.apply(this, args);
  }]);
});

insight.getUnspentUtxosPromise = promisify(insight.getUnspentUtxos);
insight.broadcastPromise = promisify(insight.broadcast);

module.exports = makeTransaction = async (emisor, privateKey, receptor, amount, fee) => {
  try {
    const utxos = await insight.getUnspentUtxosPromise(emisor);
    const tx = bitcore.Transaction();
    tx.from(utxos);
    tx.to(receptor, amount);
    tx.change(emisor);
    tx.fee(fee)
    tx.sign(privateKey)

    return insight.broadcastPromise(tx.serialize());
  } catch (e) {
    console.error(e);
  }
}
