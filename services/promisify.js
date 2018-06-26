module.exports = promisify = (context, fn) => (...args) => new Promise((resolve, reject) => {
  fn.apply(context, [...args, (err, ...args) => {
    if (err) return reject(err);
    resolve.apply(this, args);
  }]);
});
