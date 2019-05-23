'use strict';

require('should');
const supertest = require('supertest');
const app = require('../../app');

const request = supertest(app.listen());

describe('controller/devops.js', () => {
  it('healtchCheck succ', (done) => {
    // 利用 supertest 调用测试接口
    request
      .get('/healthCheck')
      .send({})
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        const data = res.body;

        data.success.should.equal(true);
        data.content.should.equal('SUCCESS');
        done();
      });
  });
});
