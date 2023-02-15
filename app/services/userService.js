const appRoot = require('app-root-path');

const {
  errorHandler: {
    RequestFailed
  }
} = require(`${appRoot}/app/utils`);

function userService() {
  function createUserHandler(userData) {
    if (userData.fullName === 'string') {
      throw new RequestFailed('try error');
    }
  }

  return {
    createUserHandler
  };
}

module.exports = userService;
