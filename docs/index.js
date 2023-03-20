const info = require('./info');
const servers = require('./servers');
const components = require('./components');
const tags = require('./tags');
const auth = require('./auth');

module.exports = {
  ...info,
  ...servers,
  ...components,
  ...tags,
  ...auth,
};
