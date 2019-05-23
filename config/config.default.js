'use strict';

const moment = require('moment');
const pkg = require('../package.json');

const dateFormat = function() {
  return '[' + moment().format('YYYY-MM-DD HH:mm:ss.SSS') + ']';
};

module.exports = {
  debug: true,
  projectName: 'app-starter',
  env: 'dev',
  port: 9100,
  globalConfigFile: `/opt/conf/${pkg.name}/config.js`,
  logger: {
    dev: {
      name: 'dev',
      level: 'debug',
      json: false,
      colorize: 'all',
      localTime: true,
      label: process.pid,
      timestamp: dateFormat,
    },
    prd: {
      name: 'prd',
      level: 'info',
      json: false,
      colorize: false,
      localTime: true,
      label: process.pid,
      timestamp: dateFormat,
      datePattern: 'YYYY-MM-DD',
      filename: 'server.%DATE%.log',
      dirname: `/data/${pkg.name}/logs/`,
      maxFiles: '60d',
    },
  },
  mysql: {
    client: {
      host: '123.207.228.200',
      port: 3306,
      user: 'root',
      password: '12345678',
      database: 'chinese',
      acquireTimeout: 3000,
      connectionLimit: 10,
      dateStrings: true,
    },
  },
  redis: {
    standalone: {
      host: '192.168.1.9',
      port: 6379,
      connectTimeout: 10000,
      // family: 4,           // 4 (IPv4) or 6 (IPv6)
      // password: 'auth',
      // db: 0
    },
    namespace: 'app-starter-koa:',
    ttl: 3600,
  },
  urlPrefix: {
    prefix: '',
  },
};
