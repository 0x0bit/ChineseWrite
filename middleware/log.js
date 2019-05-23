/**
 * 日志中间件
 */
'use strict';

const log = require('../common/log');
const errCode = require('../common/error_code');

module.exports = () => {
  return async (ctx, next) => {
    if (ctx.request.originalUrl === '/favicon.ico') {
      return;
    }
    ctx.log = log;
    ctx.errCode = errCode;
    let ip = ctx.request.ip.indexOf('::ffff:') !== -1
      ? ctx.request.ip.substr(7)
      : ctx.request.ip;
    ip = ip.indexOf('::1') !== -1
      ? '127.0.0.1'
      : ip;
    let startTime = new Date();
    await next();
    let time = (new Date() - startTime) + 'ms';
    ctx.log.info('[request log]: ', ip, ctx.request.method, ctx.request.originalUrl, time);
  };
};
