const appRoot = require('app-root-path');

const networkController = require(`${appRoot}/app/controllers/networkController`)();

module.exports = {
  networkController
};
