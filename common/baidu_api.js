const C = require('../config/config');
const axios = require('axios');
let qs = require('qs');

module.exports = {
  /**
   * 百度api汉字识别
   */
  baiduAPI: async (p) => {
    // 对传输过来的图片进行判断，是链接还是base64编码的图片
    let discernData = '';
    const regex = /^(http|https).*(gif|png|jpe?g)$/;
    if (regex.test(p.imgOrUrl)) {
      discernData = qs.stringify({
        access_token: C.baiDu.accessToken,
        url: p.imgOrUrl,
      });
    } else {
      discernData = qs.stringify({
        access_token: C.baiDu.accessToken,
        image: p.imgOrUrl,
        detect_direction: true,
      });
    }

    const params = {
      method: 'post',
      url: 'https://aip.baidubce.com/rest/2.0/ocr/v1/general_basic',
      data: discernData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };
    let response = null;
    try {
      response = await axios(params);
    } catch (error) {
      log.error('request-url:', url, error);
    }
    return response.data;
  },
};