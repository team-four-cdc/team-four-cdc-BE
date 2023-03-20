const authRoute = require('./auth');
const userRoute = require('./users');

module.exports = {
  paths: {
    ...authRoute,
    ...userRoute,
  },
};
