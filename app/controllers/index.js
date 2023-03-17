const appRoot = require("app-root-path");

const networkController =
  require(`${appRoot}/app/controllers/networkController`)();
const userController = require("./userController");

module.exports = {
  networkController,
  userController,
};
