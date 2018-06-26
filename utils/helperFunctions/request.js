let request = require('request');
const promisify = require('./promisify')

request = promisify(null, request)

module.exports = request;
