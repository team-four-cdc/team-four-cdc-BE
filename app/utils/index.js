const appRoot = require('app-root-path');

const httpRespStatusUtil = require(`${appRoot}/app/utils/httpResStatusUtil`)();
const errorHandler = require(`${appRoot}/app/utils/errorHandler`)();

module.exports = {
  httpRespStatusUtil,
  errorHandler
};
