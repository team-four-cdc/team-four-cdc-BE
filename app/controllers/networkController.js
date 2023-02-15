const appRoot = require('app-root-path');

const { networkService } = require(`${appRoot}/app/services`);
const { httpRespStatusUtil } = require(`${appRoot}/app/utils`);

function networkController() {
  // eslint-disable-next-line consistent-return
  async function getPing(req, res) {
    try {
      const result = await networkService.getPingHandler();
      return httpRespStatusUtil.sendOk(res, result);
    } catch (error) {
      return httpRespStatusUtil.sendServerError(res, { message: 'server error' });
    }
  }

  return {
    getPing
  };
}

module.exports = networkController;
