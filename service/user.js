const UserModel = require('../model/user');

module.exports = {
  ifNotExistThenCreate: async (ctx, retData) => {
    await UserModel.addUser(ctx, retData);
  },
};