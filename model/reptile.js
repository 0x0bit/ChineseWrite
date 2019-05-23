const mysql = require('../common/mysql');
const C = require('../common/constant');
const log = require('../common/log');

module.exports = {
  insertData: async (p) => {
    const SQL = `
      INSERT INTO 
        ${C.T.ARTICLE}
        (id, author, image, title, ctime, content, href, insert_time, summary, thumbnail_urls)
      VALUES(
        '${p.articleId}', '${p.articleAuthor}', '${p.articleImage}',
        '${p.articleTitle}', '${p.articleCTime}', '${p.articleConcent}',
        '${p.articleHref}', '${p.articleInsertTime}', '${p.articleSummary}', '${p.thumbnailUrls}'
      )
      ON DUPLICATE KEY UPDATE ctime = '${p.articleCTime}'`;
    try {
      await mysql.client.query(SQL);
      log.info('Model添加成功');
    } catch (e) {
      console.log('Model层数据存入失败', e);
    }
  },
};