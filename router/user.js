'use strict';

'use strict';

const {ctrlUsers} = require('../controller');
const {paramsSchema} = require('../schema');

module.exports = [
  // 前台-小程序
  {
    method: 'get',
    path: '/wx_login',
    controller: ctrlUsers.validateCode,
    paramSchema: paramsSchema.validateCode,
  },
];