'use strict';

require('should');
const supertest = require('supertest');
const app = require('../../app');

const request = supertest(app.listen());

describe('controller/example.js', () => {
  // 结合 beforeAll 及 afterAll 修改资源
  it('获取不存在的User', done => {
    request
      .get('/users/100000')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        const data = res.body;

        data.success.should.equal(false);
        done();
      });
  });

  it('获取不存在的User', async () => {
    const {body: data, status} = await request.get('/users/100000').set('Accept', 'application/json');

    status.should.equal(200);
    data.success.should.equal(false);
  });

  it('新建一个User 并 删除', async () => {
    const {body: addData, status} = await request
      .post('/users')
      .send({name: 'xxxx'})
      .set('Accept', 'application/json');
    status.should.equal(200);
    addData.content.should.have.property('id');

    const {body: deleteData} = await request.delete(`/users/${addData.content.id}`);
    deleteData.success.should.equal(true);
  });

  it('删除一个不存在的User', done => {
    request
      .delete('/users/0')
      .expect(200)
      .end((err, res) => {
        const data = res.body;

        data.success.should.equal(false);

        done();
      });
  });
});
