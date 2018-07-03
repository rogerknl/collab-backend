const redis = require('redis');
const client = redis.createClient();


module.exports.getCache = async (hash) =>
{
  return new Promise (function (resolve) {
    client.hgetall(hash, function (err,replies) {
      if (replies == null) resolve(undefined);
      else {
        resolve(replies);
      }
    });
  });
};
module.exports.setCache = async (hash,value) => {
  client.hset(hash,'data',value);
  client.expire(hash, 3600);
};





module.exports.setCacheTime = async (hash, value, time) => {
  client.set(hash, value);
  client.expire(hash, time);
};
module.exports.getCacheTime = async (hash) => {
  return new Promise (function (resolve) {
    client.get(hash, function (err,replies) {
      if (replies == null) resolve(undefined);
      else {
        resolve(replies);
      }
    });
  });
};
module.exports.delFromCache = async (hash) => {
  client.del(hash);
};
module.exports.destroyAll = async () => {
  client.FLUSHALL();
};