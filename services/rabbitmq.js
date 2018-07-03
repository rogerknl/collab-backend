const amqp = require('amqplib/callback_api');




module.exports.queueSend = async (ctx, txt = ctx.params.key) => {
  amqp.connect('amqp://localhost', function(err, conn) {
    conn.createChannel(function(err, ch) {
      var q = 'hello';

      ch.assertQueue(q, {durable: false});
      // Note: on Node 6 Buffer.from(msg) should be used
      ch.sendToQueue(q, new Buffer(txt));
      console.log(` [x] Sent ${txt}`);
    });
    setTimeout(function() { conn.close();  }, 500);
  });
};