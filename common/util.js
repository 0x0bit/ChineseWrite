/*
 * 常规工具类函数
 */

'use strict';

const crypto = require('crypto');
const log = require('./log');
const _ = require('lodash');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const secret = 'wj-ol';

/*
 * JSON.parse 替代版
 * 判断是否 string 若是则执行 JSON.parse，否则直接返回
 * 若 string 非有效 json 字符串，则直接返回空结构体{}
 * 输入null undifined 返回 {}
 */
exports.jsonParse = (str) => {
  let result = {};
  if (typeof str === 'string') {
    try {
      result = JSON.parse(str);
    } catch (e) {
      log.error(e);
      log.error('input string: ', str);
    }
  } else if (str) {
    result = str;
  }
  return result;
};

exports.rid = () => {
  return uuid().replace(/\-/g, '');
};

exports.uuid = () => {
  return uuid().replace(/\-/g, '');
};

/**
 * 类型判断
 * eg:
 * isType('String', 'hello'); // true
 * isType('Number', 1); // true
 * isType('Object', []); // false
 * @param {类型字符串} type
 */
exports.isType = (type, obj) => {
  return Object.prototype.toString.call(obj) === `[object ${type}]`;
};

/**
 * 生成defineProperties参数
 * @param args 属性数组
 * @param conf 数据属性配置
 */
exports.buildProperties = function(args, conf) {
  let obj = {};
  let tempConf = void (0);
  if (!exports.isType('Array', args)) {
    throw new TypeError(`'${args}' is not Array`);
  }
  args.map(item => {
    tempConf = JSON.parse(JSON.stringify(conf));
    tempConf.value = item;
    obj[item] = tempConf;
  });
  return obj;
};

/**
 * toString类型
 */
exports.TYPE = Object.defineProperties({}, exports.buildProperties(
  ['Array', 'Object', 'String', 'Function', 'Number', 'Boolean', 'Symbol', 'Undefined'],
  {
    enumerable: true,
    configurable: false,
    writable: false,
  },
));

/**
 * 将 callback 转换成 promise
 * 约定: callback 模式下 回调参数只能有2个参数 第一个为err 第二个为实际对象
 * sum: 求和函数
 * sum(1, 2, 3, function(err, data){ console.log(data) }) => 6
 * promisify(sum, 1, 2, 3).then(function(data){ console.log(data) }) => 6
 * @return {Promise}
 */
exports.promisify = function() {
  const fn = arguments[0];
  const args = _.toArray(arguments).slice(1);
  return new Promise((resolve, reject) => {
    function callback(err, data) {
      if (err) {
        return reject(err);
      }
      return resolve(data);
    }

    args.push(callback);

    fn.apply(null, args);
  });
};

/**
 * 首字母大写
 * @param {字符串} str
 */
exports.firstUpperCase = function(str) {
  if (!exports.isType(exports.TYPE.String, str)) {
    throw new TypeError(`${str} is not string`);
  }
  return str.replace(/^\S/, s => {
    return s.toUpperCase();
  });
};

/**
 * 生成只读enum对象
 * @param {枚举基类} obj
 */
exports.enum = function(obj) {
  return new Proxy(obj, {
    get(target, prop) {
      if (target[prop]) {
        return Reflect.get(target, prop);
      } else {
        throw new ReferenceError(`Unknown obj '${prop}'`);
      }
    },
    set() {
      throw new TypeError('obj is readonly');
    },
    deleteProperty() {
      throw new TypeError('obj is readonly');
    },
  });
};

/**
 * 判断对象是否为初始值
 * @param ...obj 对象
 * @return 是否为初始值
 */
exports.isEmpty = function() {
  for (let obj of arguments) {
    if (obj === null || obj === undefined) {
      return true;
    } else if (exports.isType(exports.TYPE.String, obj) && obj.trim() === '') {
      return true;
    }
  }
  return false;
};

/**
 * @param {String} method 请求方式
 * @param {String} url 请求地址
 * @param {String} data 参数
 * @param {Object} headers 请求头
 */
exports.request = async (method, url, data, headers = {}) => {
  const type = method === 'get' ? 'params' : 'data';
  const params = {
    method,
    url: url,
    [type]: data,
    headers: headers,
  };
  let response = null;
  try {
    response = await axios(params);
    // log.debug('response', JSON.stringify(response.data, null, '\t'));
  } catch (error) {
    log.error('request-url:', url, error);
    // throw new SysError(error.message, ErrorCode.ERROR_UNKNOWN);
  }

  return response.data;
};

exports.encryption = (obj) => {
  //jwt生成token
  const token = jwt.sign({
    openId: obj.openid,
  }, secret, {
    expiresIn: 60 * 30,
  });
  return token;
};

exports.validateToken = (token) => {
  return jwt.verify(token, secret, (err, decoded) => {
    if (!err) {
      return decoded.openId;
    }
    return false;
  });
};

exports.md5 = (text, inEncode = 'utf8', outEncode = 'hex') => {
  return crypto.createHash('md5').update(text, inEncode).digest(outEncode);
};

/**
 * 对密码进行签名加盐
 * @param {*} md5Pass
 * @param {*} salt
 */
exports.encodePassword = (md5Pass, salt) => {
  return this.md5(this.md5(md5Pass) + salt);
};

exports.getRandomNumber = (length = 6) => {
  let authCode = '';
  for (let i = 0; i < length; i++) {
    authCode += Math.floor(Math.random() * 10);
  }
  return authCode;
};