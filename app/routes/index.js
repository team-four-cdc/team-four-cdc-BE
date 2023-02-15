const appRoot = require('app-root-path');

const networkRouter = require(`${appRoot}/app/routes/networkRouter`);
const userRouter = require(`${appRoot}/app/routes/userRouter`);

module.exports = {
  networkRouter,
  userRouter
};
