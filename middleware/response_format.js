/**
 * response 格式化中间件
 */

'use strict';

module.exports = function() {
  return async (ctx, next) => {
    try {
      await next();
      ctx.body = {
        code: ctx.errCode.SUCCESS_OK,
        success: true,
        content: ctx.body,
        message: null,
      };
    } catch (err) {
      /* istanbul ignore next */
      ctx.log.warn('[server warn]: ', ctx.request.method, ctx.request.originalUrl, ctx.status, ctx.reqParam, err);
      ctx.status = 200;
      ctx.body = {
        code: err.code || 0,
        success: false,
        content: null,
        message: err.message,
      };
    }
  };
};
