'use strict';

require('should');
const UserModel = require('../../model/user');
const context = require('../context');

describe('model/user.js', () => {
  it('获取不存在的User', async () => {
    const res = await UserModel.getUser(context, 0);

    should.equal(res, null);
  });
});
