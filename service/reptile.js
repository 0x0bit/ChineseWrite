'use strict';

const reptileModel = require('../model/reptile');
const log = require('../common/log');
const moment = require('moment');

module.exports = {
  insertData: async (p) => {
    const image = [
      'http://pp6qq1rkn.bkt.clouddn.com/1018830155-5c9f706af1b5f_articlex.jpeg',
      'http://pp6qq1rkn.bkt.clouddn.com/2142258620-5c9e4a99a293c_articlex.jpeg',
      'http://pp6qq1rkn.bkt.clouddn.com/3213cvvx.png',
      'http://pp6qq1rkn.bkt.clouddn.com/5940c5cc6e8c8f6cf3b9c1a22b640203.png',
      'http://pp6qq1rkn.bkt.clouddn.com/u=2504139655,321052429&fm=26&gp=0.jpg',
      'http://pp6qq1rkn.bkt.clouddn.com/78151f4cfe94ab5575fffd689b019469.png',
      'http://pp6qq1rkn.bkt.clouddn.com/u=1029364834,21772339&fm=26&gp=0.jpg',
    ];

    const regex = /[0-9]{16}/g;
    const now = moment().format('YYYY-MM-DD');
    p.articleId = p.articleHref.match(regex)[0];
    p.articleAuthor = p.articleAuthor.split(' ')[0];
    // 去头尾空格
    p.articleConcent = p.articleConcent.replace(/(^\s*)|(\s*$)/g, '');
    // 将文本中的单引号转为双引号
    p.articleConcent = p.articleConcent.replace(/\'/g, '"');
    p.articleConcent = p.articleConcent.replace('src="/img/', 'src="https://segmentfault.com/img/');
    p.articleSummary = p.articleSummary.replace(/\s+/g, '').substr(0, 100);
    p.articleInsertTime = now;
    p.thumbnailUrls = image[Math.floor(Math.random() * image.length)];
    log.info('调用model准备存入数据');
    await reptileModel.insertData(p);
  },
};