const appRoot = require('app-root-path');

const networkController = require(`${appRoot}/app/controllers/networkController`)();
const userController = require(`${appRoot}/app/controllers/userController`)();

module.exports = {
  networkController,
  userController
};
