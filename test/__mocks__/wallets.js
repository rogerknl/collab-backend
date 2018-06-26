/**
* Testing wallets, containing some testing BTC from the testnet. They have no real
* value and will never do.
* If these get empty, ask for more testing BTC at https://testnet.coinfaucet.eu/
*/

/** This is the wallet with more testing BTC, use this as sender */
module.exports.wallet1 = {
  address: 'mrcDTLhJKA1tD2J9u8LRChYXpscMNw2Pq4',
  privateKey: 'd3ede07884fdbc7d3c95e5c30f2384822974a9195ccc5883fc64de84736b9596',
  privateKeyWIF: 'cUgfV3EVVkHvVsuUP81bCGa8Ky27jEdgkMxvowD4yzWZkcVTEgic'
}

/** This is the wallet with less testing BTC, use this as receiver */
module.exports.wallet2 = {
  address: 'mki92BK9ZGryYCoNi2xMbmgxvo9XJP1n8D',
  privateKey: 'd403527379c21c94510797cbd899ef431f0dcf6faed83cb12fa26bfd87cee384',
  privateKeyWIF: 'cUgpvq3Ezv7QrbZqQKV7bTAcBR7oaSJecqW2TtBJ6PPrFnTwh3ho'
}

/** Don't make transactions to this one, it's only for testing methods. */
module.exports.testingWallet = {
  address: 'mjYDvuHbv1qFxEHrt72MoCJqu65rUK75F3',
  privateKey: 'a564c51f3f0204a6109c7c63008c5b99da4f6014fff17ef2cb5a9564b86cb2c4',
  privateKeyWIF: 'cT8CriPUS5yord5tKZyHn2fUXMitR9ouV7mGsCas5fyb7GiAihwT'
}

/** Don't make transactions to this one either, it's only for testing methods. */
module.exports.emptyTestingWallet = {
  address: 'n3sAw7P7XvnJUtSrMecTj4Txas34n9DeGi',
  privateKey: '2c9547f6eecb205dc7b0f5a70aa5d435e9da98b005da8920e2dc243f5b6f7d02',
  privateKeyWIF: 'cP5N9X6EwdbGDS2Uwwng44RH4CX6zUuJWN1a6zL7uQnwme1vv5St'
}
