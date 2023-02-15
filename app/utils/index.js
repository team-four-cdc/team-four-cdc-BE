const appRoot = require('app-root-path');

const httpResStatusUtil = require(`${appRoot}/app/utils/httpResStatusUtil`)();
const errorHandler = require(`${appRoot}/app/utils/errorHandler`)();
const errorResponseUtil = require(`${appRoot}/app/utils/errorResponseUtil`);

module.exports = {
  httpResStatusUtil,
  errorHandler,
  errorResponseUtil
};
