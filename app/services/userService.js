function userService() {
  function createUserHandler(userData) {
    if (userData.fullName === 'string') {
      throw new Error('try error');
    }
  }

  return {
    createUserHandler
  };
}

module.exports = userService;
