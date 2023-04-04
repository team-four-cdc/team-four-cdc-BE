const authRoute = require('./auth');
const userRoute = require('./users');
const networkRoute = require('./network');
const categoryRoute = require('./category');

module.exports = {
  paths: {
    ...authRoute,
    ...userRoute,
    ...networkRoute,
    ...categoryRoute,
  },
};
