const appRoot = require('app-root-path');

const networkController =
  require(`${appRoot}/app/controllers/networkController`)();
const userController = require('./userController');
const authController = require('./authController');

module.exports = {
  networkController,
  userController,
  authController,
};
