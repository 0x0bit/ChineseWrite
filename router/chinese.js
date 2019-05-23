'use strict';

const {ctrlChinese} = require('../controller');
const {paramsSchema} = require('../schema');
// 路由列表
module.exports = [
  // 百度api请求
  {
    method: 'post',
    path: '/baidu/api/discern',
    controller: ctrlChinese.discern,
    paramSchema: paramsSchema.discern,
  },

  // 手写汉字API
  {
    method: 'post',
    path: '/write',
    controller: ctrlChinese.writeDiscern,
    paramSchema: paramsSchema.writeDiscern,
  },
];
