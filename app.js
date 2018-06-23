'use strict';
const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const cors = require('kcors');
require('dotenv').config();

const router = require(__dirname+'/routes.js');

app
.use(logger())
.use(cors())
.use(bodyParser())
.use(router.routes())
.use(router.allowedMethods())


const port = process.env.PORT || 3030;
app.listen(port,()=>{
  // eslint-disable-next-line
  console.log('Listening to %s', port);
});