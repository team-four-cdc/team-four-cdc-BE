/* eslint-disable consistent-return */
const appRoot = require('app-root-path');

const { httpResStatusUtil, errorResponseUtil } = require(`${appRoot}/app/utils`);
const { userService } = require(`${appRoot}/app/services`);

function userController() {
  async function createUser(req, res) {
    try {
      const result = await userService.createUserHandler(req.body);
      return httpResStatusUtil.sendOk(res, result);
    } catch (error) {
      return errorResponseUtil(res, error);
    }
  }

  return {
    createUser
  };
}

module.exports = userController;
