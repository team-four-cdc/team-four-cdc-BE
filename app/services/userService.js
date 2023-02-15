const appRoot = require('app-root-path');

const {
  errorHandler: {
    BadRequest
  }
} = require(`${appRoot}/app/utils`);

function userService() {
  function createUserHandler(userData) {
    if (userData.fullName === 'string') {
      throw new BadRequest('try error');
    }
  }

  return {
    createUserHandler
  };
}

module.exports = userService;
