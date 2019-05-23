'use strict';

const Mysql = require('@dtwave/mysql');

const config = require('../config');
const log = require('../common/log');

const mysqlServer = new Mysql(config.mysql);
mysqlServer.on('connection', (msg) => {
  log.info('mysql new connection', msg);
});
mysqlServer.on('error', (err) => {
  log.error('mysql on error', err);
});

let checkInterval = config.checkInterval || 300000;
let timer = setInterval(async () => {
  try {
    await mysqlServer.getClient().query('select now()');
  } catch (err) {
    log.error('mysql check err: ', err);
  }
}, checkInterval);
// 不到事件循环计数去
timer.unref();

module.exports = mysqlServer;