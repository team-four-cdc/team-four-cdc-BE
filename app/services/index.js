const appRoute = require('app-root-path');
const networkService = require(`${appRoute}/app/services/networkService`)();

module.exports = {
  networkService
};
