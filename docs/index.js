const info = require('./info');
const servers = require('./servers');
const components = require('./components');
const tags = require('./tags');
const routes = require('./routes');

module.exports = {
  ...info,
  ...servers,
  ...components,
  ...tags,
  ...routes,
};
