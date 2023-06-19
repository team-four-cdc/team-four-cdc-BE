function networkService() {
  function getPingHandler() {
    return {
      message: 'ok',
    };
  }

  return {
    getPingHandler,
  };
}

module.exports = networkService;
