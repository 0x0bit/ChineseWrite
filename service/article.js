const articleModel = require('../model/article');

module.exports = {
  /**
   * 获取文章列表
   * @return  {Object}  {list, total}
   */
  getArticleList: async ctx => {
    let result = await articleModel.getArticleList(ctx);
    if (result) {
      return result;
    } else {
      result.list = [];
      result.total = 0;
    }
  },

  /**
   * 获取文章详情
   * @return  {Object}  article
   */
  getArticle: async ctx => {
    let article = await articleModel.getArticle(ctx);
    if (article) {
      return article;
    } else {
      article = {};
    }
  },
};