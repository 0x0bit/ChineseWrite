'use strict';
const api = require('../common/baidu_api');
const fs = require('fs');
const superagent = require('superagent');
const util = require('../common/util');

const writeData = async (type) => {
  const url = `http://localhost:5000/${type}`;
  let data = new Promise(((resolve, reject) => {
    superagent
      .get(url)
      .then((res)=>{
        let resToken = util.jsonParse(res.text);
        resolve(resToken)
      });
  }));
  return data;
};

module.exports = {
  /**
   * 百度api汉字识别
   */
  discern: async ctx => {
    const {imgOrUrl} = ctx.reqParams.body;
    const result = await api.baiduAPI({imgOrUrl});
    let word = [];
    let code = 400;
    if (result.words_result_num) {
      code = 200;
      result.words_result.forEach(el => {
        word.push(el.words);
      });
    }
    ctx.body = {
      word,
      code,
    };
  },


  writeDiscern: async ctx => {
    const {imgData, type} = ctx.reqParams.body;
    let base64Data = imgData.replace(/^data:image\/\w+;base64,/, '');
    let dataBuffer = Buffer.from(base64Data, 'base64');
    fs.writeFile('write/data/image.png', dataBuffer, (err) => {
      if (err) {
        ctx.body = {
          code: 400,
          data: {},
        };
        return;
      }
    });
    let result = '';
    if (type === 1) {
      result = await writeData('one');
    } else {
      result = await writeData('more');
      result = result.join('');
    }
    ctx. body = {
      code: 200,
      data: result,
    };
  },
};

