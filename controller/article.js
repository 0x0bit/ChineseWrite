
const articleService = require('../service/article');

module.exports = {
  /**
   * 获取文章列表
   * @return  {Object}  {list, total}
   */
  articleList: async (ctx) => {
    const {list, total} = await articleService.getArticleList(ctx);
    ctx.body = {
      list,
      total,
    };
  },

  /**
   * 获取文章详情
   * @return  {Object}  article
   */
  articleDetails: async (ctx) => {
    const article = await articleService.getArticle(ctx);
    ctx.body = {
      article,
    };
  },
};