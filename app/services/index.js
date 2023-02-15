const appRoute = require('app-root-path');

const networkService = require(`${appRoute}/app/services/networkService`)();
const userService = require(`${appRoute}/app/services/userService`)();

module.exports = {
  networkService,
  userService
};
