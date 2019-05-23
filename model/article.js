const C = require('../common/constant');
const mysql = require('../common/mysql');
let fields = [
  'id',
  'author',
  'image',
  'title',
  'ctime',
  'thumbnail_urls',
  'summary',
];

module.exports = {
  /**
   * 获取文章详情
   * @return  {Object}  {list, total}
   */
  getArticleList: async (ctx) => {
    const {page, pageSize} = ctx.reqParams.query;
    const list = await mysql.getPageList(C.T.ARTICLE, null, page, pageSize, fields, 'ctime', 'DESC');
    const total = await mysql.getCount(C.T.ARTICLE);
    return {
      list,
      total,
    };
  },

  /**
   * 获取文章详情
   *
   * @return  {Object}  article
   */
  getArticle: async (ctx) => {
    const {articleid} = ctx.reqParams.query;
    const field = [...fields, 'content', 'href'];
    return await mysql.getData(C.T.ARTICLE, {id: articleid}, field);
  },

};