/* eslint-disable consistent-return */
const appRoot = require('app-root-path');

const { httpResStatusUtil, errorResponseUtil } = require(`${appRoot}/app/utils`);
const { userService } = require(`${appRoot}/app/services`);

function userController() {
  async function createUserReader(req, res) {
    try {
      const result = await userService.createUserReaderHandler(req.body);
      return httpResStatusUtil.sendOk(res, result);
    } catch (error) {
      return errorResponseUtil(res, error);
    }
  }

  async function verificationUserLink(req, res) {
    try {
      const { generateCode } = req.body;
      const result = await userService.verificationUserLinkHandler(generateCode);
      return httpResStatusUtil.sendOk(res, result);
    } catch (error) {
      return errorResponseUtil(res, error);
    }
  }

  return {
    createUserReader,
    verificationUserLink
  };
}

module.exports = userController;
