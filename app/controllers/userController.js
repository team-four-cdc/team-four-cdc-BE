/* eslint-disable consistent-return */
const appRoot = require('app-root-path');

const { httpRespStatusUtil } = require(`${appRoot}/app/utils`);
const { userService } = require(`${appRoot}/app/services`);

function userController() {
  async function createUser(req, res) {
    try {
      const result = await userService.createUserHandler(req.body);
      return httpRespStatusUtil.sendOk(res, result);
    } catch (error) {
      console.log(error.message, '=======>>>');
    }
  }

  return {
    createUser
  };
}

module.exports = userController;
