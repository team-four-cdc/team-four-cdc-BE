const appRoot = require('app-root-path');

const httpRespStatusUtil = require(`${appRoot}/app/utils/httpResStatusUtil`)();

function errorResponseUtil(res, error) {
  switch (error.codeStatus) {
    case 400:
      return httpRespStatusUtil.sendBadRequest(res, error);
    case 401:
      return httpRespStatusUtil.sendUnauthorized(res, error);
    case 403:
      return httpRespStatusUtil.sendRequestFailed(res, error);
    case 404:
      return httpRespStatusUtil.sendNotFound(res, error);
    case 409:
      return httpRespStatusUtil.sendConflict(res, error);
    case 429:
      return httpRespStatusUtil.sendTooManyRequests(res, error);
    case 500:
      return httpRespStatusUtil.sendServerError(res, error);
    default:
      return httpRespStatusUtil.sendServerError(res, error);
  }
}

module.exports = errorResponseUtil;
