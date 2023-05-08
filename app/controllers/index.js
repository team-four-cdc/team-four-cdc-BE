const appRoot = require('app-root-path');

const networkController =
  require(`${appRoot}/app/controllers/networkController`)();
const userController = require('./userController');
const authController = require('./authController');
const categoryController = require('./categoryController');
const articleController = require('./articleController');
const mediaController = require('./mediaController');
const paymentController = require('./paymentController');

module.exports = {
  networkController,
  userController,
  authController,
  categoryController,
  articleController,
  mediaController,
  paymentController,
};
