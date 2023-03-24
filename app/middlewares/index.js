const appRoot = require('app-root-path');

const authJWT = require(`${appRoot}/app/middlewares/authJWT`)();

module.exports = {
  authJWT,
};
