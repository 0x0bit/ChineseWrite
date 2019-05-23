'use strict';

const Koa = require('koa');
const config = require('./config');
const log = require('./common/log');
const middleware = require('./middleware');
const timed = require('./reptile/reptile');

const app = new Koa();

// 中间件
middleware.bind(app);

log.info(`============= env: ${config.env} =============`);

const server = app.listen(config.port, '0.0.0.0', () => {
  log.info('Server listening on port: ' + server.address().port);
});

// 定时任务
timed.timedTask();

// 暴露app出去，用于测试
module.exports = app;
