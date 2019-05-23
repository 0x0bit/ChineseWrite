module.exports = {
  port: 8080,
  mysql: {
    client: {
      host: '',
      port: 3306,
      user: 'root',
      password: '',
      database: 'chinese',
      acquireTimeout: 3000,
      connectionLimit: 10,
      dateStrings: true,
    },
  },
  weChat: {
    appId: '',
    appSecret: '',
  },

  baiDu: {
    appId: '',
    apiKey: '',
    secertKey: '',
    accessToken: '',
  },
};
