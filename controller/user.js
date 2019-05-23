const util = require('../common/util');
const weChatConf = require('../config').weChat;
const SysError = require('../common/sys_error');
const ErrorCode = require('../common/error_code');
const userService = require('../service/user');

module.exports = {
  validateCode: async ctx => {
    const params = {
      appid: weChatConf.appId,
      secret: weChatConf.appSecret,
      js_code: ctx.reqParams.query.code,
      grant_type: 'authorization_code',
    };
    // 获取微信的信息
    const retData = await util.request(
      'get',
      'https://api.weixin.qq.com/sns/jscode2session',
      params
    );

    if (retData.errcode) {
      throw new SysError(`${retData.errmsg}`, ErrorCode.ERROR_VALIDATE);
    }
    ctx.body = {
      token: await util.encryption(retData),
      openId: retData.openid,
    };
    // 该open_id是否在微信用户表里存在, 不存在则创建
    await userService.ifNotExistThenCreate(ctx, retData);
  },
};