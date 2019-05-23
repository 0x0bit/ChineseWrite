const moment = require('moment');
const mysql = require('../common/mysql');

module.exports = {
  addUser: async (ctx, p) => {
    const time = moment().format('YYYY-MM-DD HH:mm:ss');
    const sql = `
      INSERT INTO 
        pub_wechat_user 
        (open_id, ctime, mtime) 
      SELECT
        '${p.openid}',
        '${time}',
        '${time}'
      FROM 
        DUAL 
      WHERE 
      NOT EXISTS ( 
        SELECT 
          open_id 
        FROM 
          pub_wechat_user 
        WHERE 
          BINARY open_id = '${p.openid}')`;
    return await ctx.app.mysql.client.query(sql);
  },
};