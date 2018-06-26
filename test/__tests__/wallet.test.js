'use strict';

const wallet = require('../../services/wallet');
const mocks = require('../__mocks__/wallets');
const request = require('../../utils/helperFunctions/request');

describe('createWallet', () => {
  it('Returns an object with 3 properties', () => {
    return expect(Object.values(wallet.createWallet()).length).toEqual(3)
  });

  it('Properties should be string type', () => {
    const properties = Object.values(wallet.createWallet())
    return expect(properties.every(prop => typeof prop === 'string')).toBe(true)
  });
})

describe('getWalletBalance', () => {
  it('Returns a number', async () => {
    const response = await wallet.getWalletBalance(mocks.wallet1.address);
    return expect(typeof response).toBe('number')
  });

  /** This test could start failing if the testingWallet receives a transaction. */
  it('Returns the total number of satoshis in the wallet', async () => {
    const response = await wallet.getWalletBalance(mocks.testingWallet.address);
    return expect(response).toBe(21000)
  })

  it('Logs an error if argument is not a correct public addres', async () => {
    const spy = jest.spyOn(global.console, 'error')

    const response = await wallet.getWalletBalance('not an addres!');
    expect(spy).toHaveBeenCalled();
  })
})

describe('getUTXOS', () => {
  it('Returns an array', async () => {
    const response = await wallet.getUTXOS(mocks.testingWallet.address)
    expect(Array.isArray(response)).toBe(true)
  })

  it('Returns an empty array if there are not UTXOS', async () => {
    const response = await wallet.getUTXOS(mocks.emptyTestingWallet.address)
    expect(response).toEqual([])
  })
})

describe('makeTransaction', () => {
  it('Makes a transaction between two accounts and returns transaction ID', async () => {
    const transaction = await wallet.makeTransaction(
      mocks.wallet1.address, mocks.wallet1.privateKey,
      mocks.wallet2.address, 10000)

    expect(typeof transaction).toBe('string');

    /** Looks up transaction info in an external API. This API has a limit
    * of 5 requests/second.
    */
    request(`https://chain.so/api/v2/get_tx/BTCTEST/${transaction}`)
    .then(txInfo => {
      /** Check the if the transaction has been broadcasted */
      setTimeout(() => {
        console.log(txInfo);
        expect(txInfo.body.data.inputs[0].address).toBe(mocks.wallet1.address)
        expect(txInfo.body.data.outputs[0].value).toBe("0.00010000")
        expect(txInfo.body.data.outputs[0].address).toBe(mocks.wallet2.address)
      }, 2000)
    })
  });

  it('Logs an error if emisor or receptor are not correct addresses', async () => {
    const spy = jest.spyOn(global.console, 'error')
    const transaction = await wallet.makeTransaction(
      "shhh I'm not an adress!", mocks.wallet1.privateKey,
      'me neither...', 10000)

    expect(spy).toHaveBeenCalled();
  });

  it('Logs an error if balance of the wallet is inferior than amount to send', async () => {
    const spy = jest.spyOn(global.console, 'error')
    const transaction = await wallet.makeTransaction(
      mocks.emptyTestingWallet.address, mocks.emptyTestingWallet.privateKey,
      mocks.wallet2.address, 999999999)

    expect(spy).toHaveBeenCalled();
  });

  it('Logs an error if miner fee is too small', async () => {
    const spy = jest.spyOn(global.console, 'error')
    const transaction = await wallet.makeTransaction(
      mocks.emptyTestingWallet.address, mocks.emptyTestingWallet.privateKey,
      mocks.wallet2.address, 10000, 1)

    expect(spy).toHaveBeenCalled();
  });

  it('Logs an error if privateKey is not correct', async () => {
    const spy = jest.spyOn(global.console, 'error')
    const transaction = await wallet.makeTransaction(
      mocks.emptyTestingWallet.address, 'the key to your heart',
      mocks.wallet2.address, 10000)

    expect(spy).toHaveBeenCalled();
  });
})
