/**
 * 统一参数校验中间件
 */
'use strict';

const Joi = require('joi');
const SysError = require('../common/sys_error');

module.exports = (paramSchema) => {
  return async function(ctx, next) {
    // 注释掉的语句可能出现参数一样，而合并的情况
    // ctx.reqParam = Object.assign({}, ctx.params, ctx.query, ctx.request.body);
    const reqParam = {
      router: ctx.params,
      query: ctx.query,
      body: ctx.request.body,
    };
    ctx.reqParams = reqParam;
    if (!paramSchema) {
      return next();
    }
    let schemaKeys = Object.getOwnPropertyNames(paramSchema);
    if (paramSchema && schemaKeys.length > 0) {
      // 参数检查
      schemaKeys.some(item => {
        let validResult = Joi.validate(reqParam[item], paramSchema[item], {allowUnknown: true});
        if (validResult.error) {
          ctx.log.warn('[param error]: ', validResult.error.message);
          ctx.throw(500, new SysError('参数错误', ctx.errCode.ERROR_PARAMS));
        }
        //使用joi校验过的合法参数，字符串数字会按照joi定义的转成数字
        reqParam[item] = validResult.value;
      });
    }
    await next();
  };
};
