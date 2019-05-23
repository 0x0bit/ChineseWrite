const puppeteer = require('puppeteer');
const reptileService = require('../service/reptile');
const log = require('../common/log');
const schedule = require('node-schedule');
// 做定时任务
// const schedule = require('node-schedule');

function sleep(delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(1);
      } catch (e) {
        reject(0);
      }
    }, delay);
  });
}

const rep = async () => {
  const browser = await (puppeteer.launch({
    timeout: 0,
    //如果是访问https页面 此属性会忽略https错误
    ignoreHTTPSErrors: false,
    // 打开开发者工具, 当此值为true时, headless总为false
    devtools: false,
    // 关闭headless模式, 不会打开浏览器
    headless: false,
  }));

  const page = await browser.newPage();
  try {
    await page.goto('https://segmentfault.com/channel/ai', {waitUntil: 'load'});
    await page.waitFor(1000);
    //处理网页懒加载
    // 网页加载最大高度
    const maxHeightPx = 20000;
    // 滚动高度
    let scrollStep = 1080;
    let heightLimit = false;
    let mValues = {'scrollEnable': true, 'height_limit': heightLimit};
    while (mValues.scrollEnable) {
      mValues = await page.evaluate((scrollStep, maxHeightPx, heightLimit) => {
        if (document.scrollingElement) {
          let scrollTop = document.scrollingElement.scrollTop;
          document.scrollingElement.scrollTop = scrollTop + scrollStep;
          if (null !== document.body && document.body.clientHeight > maxHeightPx) {
            heightLimit = true;
          } else if (document.scrollingElement.scrollTop + scrollStep > maxHeightPx) {
            heightLimit = true;
          }
          let scrollEnableFlag = false;
          if (null !== document.body) {
            scrollEnableFlag = document.body.clientHeight > scrollTop + 1081 && !heightLimit;
          } else {
            scrollEnableFlag = document.scrollingElement.scrollTop + scrollStep > scrollTop + 1081 && !heightLimit;
          } return {
            'scrollEnable': scrollEnableFlag,
            'height_limit': heightLimit,
            'document_scrolling_Element_scrollTop': document.scrollingElement.scrollTop,
          };
        }
      }, scrollStep, maxHeightPx, heightLimit);
      await sleep(2000);
    }

  } catch (e) {
    log.info('跳转目标链接失败', e);
  }

  let inputElement = await page.evaluate(() => {
    let hrefArray = [];
    try {
      let href = Array.from(document.getElementsByClassName('news__item-info'));
      href.forEach(el => {
        hrefArray.push({
          href: el.getElementsByTagName('a')[0].href,
        });
      });
    } catch (e) {
      log.info('获取文章链接失败', e);
    }
    return hrefArray;
  });

  let count = 0;
  for (let i = 0; i < inputElement.length; i++) {
    try {
      await page.goto(inputElement[i].href);
    } catch (e) {
      log.info(e);
    }
    let articles = await page.evaluate(() => {
      try {
        return {
          articleHref: document.getElementsByClassName('post-topheader__info--title')[0].getElementsByTagName('a')[0].href,
          articleCTime: document.getElementsByClassName('article__authorright')[0].getElementsByTagName('span')[2].innerText,
          articleTitle: document.getElementsByClassName('post-topheader__info--title')[0].getElementsByTagName('a')[0].innerText,
          articleAuthor: document.getElementsByClassName('article__authormeta')[0].innerText,
          articleImage: document.getElementsByClassName('article__authorleft')[0].getElementsByTagName('img')[0].src,
          articleConcent: document.getElementsByClassName('article__content')[0].innerHTML,
          articleSummary: document.getElementsByClassName('article__content')[0].innerText,
        };
      } catch (e) {
        console.log('获取文章链接失败', e);
      }
    });
    if (articles !== undefined) {
      count++;
      log.info('正在调用service。。。');
      await reptileService.insertData(articles);
    } else {
      console.log('数据格式不符合爬取规则--->' + inputElement[i].href);
    }
    if (i === inputElement.length - 1) {
      console.log('抓取到的链接总共：' + i + ', 数据库插入成功：' + count);
    }
  }

  browser.close();
  return;
};

// 定时抓取任务
exports.timedTask = () => {
  log.info('Puppeteer: 开始等待目标时刻...');
  schedule.scheduleJob('30 1 18 * * *', function(){
    log.info('定时爬取数据...');
    rep();
    return;
  });
};