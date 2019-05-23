const {ctrlArticle} = require('../controller');
const {paramsSchema} = require('../schema');
module.exports = [
  // 获取文章列表
  {
    method: 'get',
    path: '/article/list',
    controller: ctrlArticle.articleList,
    paramSchema: paramsSchema.articleList,
  },

  // 获取文章详情
  {
    method: 'get',
    path: '/article/details',
    controller: ctrlArticle.articleDetails,
    paramSchema: paramsSchema.articleDetails,
  },
];