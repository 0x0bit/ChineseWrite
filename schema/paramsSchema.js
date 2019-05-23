const Joi = require('joi');

/**
 * 微信用户登录code验证
 */
const validateCodeValidateSchema = {
  query: Joi.object({
    code: Joi.string().required(),
  }).unknown(false),
};

/**
 * 文章列表验证
 */
const articleListValidateSchema = {
  query: Joi.object({
    page: Joi.number().default(1).required(),
    pageSize: Joi.number().default(10).required(),
  }),
};

/**
 * 获取文章详情
 */
const articleDetailsValidateSchema = {
  query: Joi.object({
    articleid: Joi.string().required(),
  }),
};

/**
 * 百度API的请求
 */
const discernValidateSchema = {
  body: Joi.object({
    imgOrUrl: Joi.string().required(),
  }),
};

/**
 * 手写的请求
 */
const writeDiscernValidateSchema = {
  body: Joi.object({
    imgData: Joi.string().required(),
    type: Joi.number().min(1).max(2).required(),
  }),
};
module.exports = {
  validateCode: validateCodeValidateSchema,
  articleList: articleListValidateSchema,
  articleDetails: articleDetailsValidateSchema,
  discern: discernValidateSchema,
  writeDiscern: writeDiscernValidateSchema,
};