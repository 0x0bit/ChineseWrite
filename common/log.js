'use strict';

const DailyRotateFile = require('winston-daily-rotate-file');
const {createLogger, transports, format} = require('winston');

const config = require('../config');
const {combine, timestamp, printf} = format;

let _transports = null;
if (!config.debug) {
  _transports = [new DailyRotateFile(config.logger.prd)];
} else {
  _transports = [new transports.Console(config.logger.dev)];
}

const logger = createLogger({
  transports: _transports,
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    printf(info => {
      let splatInfo = info[Symbol.for('splat')];
      if (!splatInfo) {
        return `[${info.timestamp}] - ${info.level}: ${info.message}`;
      }
      return `[${info.timestamp}] - ${info.level}: ${info.message} ${splatInfo.join(' ')}`;
    })
  ),
});

module.exports = logger;
