
const cache = require(__dirname + '/../services/cacheEmail');
const amqp = require('amqplib/callback_api');

const wallet = require(__dirname + '/../services/wallet');
const db = require(__dirname + '/../models/index');



function sleep(ms){
  return new Promise(resolve=>{
    setTimeout(resolve,ms);
  });
}

amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var q = 'wallet_id_tx';

    ch.assertQueue(q, {durable: false});
    ch.prefetch(1);
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
    ch.consume(q,  async (msg) => {
      let resp = await cache.getCacheTime(msg.content.toString());

      if (!resp) {
        await cache.setCacheTime(msg.content.toString(),1,40);
        let ops = await cache.getCacheTime('tx');
        if( Number(ops) === 4 ) {
          console.log('halt');
          await sleep(1500);
          ops = 0;
        }
        await registerTxInbound(msg.content.toString());

        if(!ops)ops=0;
        await cache.setCacheTime('tx',Number(ops)+1,1);
        ops = await cache.getCacheTime('tx');
        console.log(" [x] Received %s", msg.content.toString(),ops);
        ch.ack(msg);
      }
      else {
        ch.ack(msg);
        console.log('cached');
      }
    }, {noAck: false});
  });
});


const registerTxInbound = async ( walletid ) => {
  try{
    //take the last inbound tx in the db
    const txR = await db.Transaction.findOne({
      where:{
        wallet_id: walletid,
        type: 'inbound'
      },
      order: [['DATE', 'DESC']]
    });
    let tx;
    if ( !txR ) {
      tx = await wallet.getInbTransactions(walletid);
    }
    else {
      tx = await wallet.getInbTransactions(walletid,txR.dataValues.transaction_str);
      console.log(tx);
    }

    const result = [];
    if (tx){
      for(let txi of tx ) {
        const txToRecord = {
          type: 'inbound',
          amount: txi.value,
          transaction_str: txi.txid,
          date: new Date(txi.time),
          wallet_id: walletid
        };
        await db.Transaction.create(txToRecord);
        result.push(txToRecord);
      }
    }
  } catch (err){
    console.log('HALT!!!', err);
  }
};
