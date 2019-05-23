'use strict';

const chinese = require('./chinese');
const user = require('./user');
const article = require('./article');
module.exports = {
  ctrlChinese: chinese,
  ctrlUsers: user,
  ctrlArticle: article,
};
