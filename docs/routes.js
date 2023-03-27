const authRoute = require('./auth');
const userRoute = require('./users');
const networkRoute = require('./network');

module.exports = {
  paths: {
    ...authRoute,
    ...userRoute,
    ...networkRoute,
  },
};
