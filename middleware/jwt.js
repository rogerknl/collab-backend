var jwt = require('jsonwebtoken');

const jWToken = async (ctx, next) => {
  ctx.jwt = {};
  ctx.jwt['modified'] = false;

  if (!ctx.request.headers.authorization && ctx.url !== '/register') return await next();
  if ( ctx.request.headers.authorization ){
    const auth = ctx.request.headers.authorization.split(' ');
    if (auth[0] !== 'Bearer') {
      await next();
    } else {
      let decoded = jwt.verify(auth[1], 'SecretFTW!');
      ctx.user = {
        username: decoded.username
      };
      await next();
    }
  } else await next();


  if (ctx.jwt.modified) {
    ctx.set('x-token',jwt.sign(ctx.user, 'SecretFTW!', {
      expiresIn: 3600
    }));
  }

};

module.exports = jWToken;