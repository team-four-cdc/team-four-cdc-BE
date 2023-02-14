function httpRespStatusUtil() {
  function _errorFormat(data) {
    const errorBaseFormat = {
      message: data
    };

    if (typeof data !== 'string') {
      return data;
    }

    return errorBaseFormat;
  }

  function _successFormat(data) {
    const generalSuccessBaseFormat = {
      message: data
    };

    if (typeof data !== 'string') {
      return data;
    }

    return generalSuccessBaseFormat;
  }
  function sendOk(res, data) {
    // Everything worked as expected.
    res.status(200).send(_successFormat(data));
  }

  function sendBadRequest(res, data) {
    // The request was unacceptable, often due to missing a required parameter.
    res.status(400).send(_errorFormat(data));
  }

  function sendUnauthorized(res, data) {
    // The signature was not valid.
    res.status(401).send(_errorFormat(data));
  }

  function sendRequestFailed(res, data) {
    // The parameters were valid but the request failed.
    res.status(403).send(_errorFormat(data));
  }

  function sendNotFound(res, data) {
    // The requested resource doesn't exist.
    res.status(404).send(_errorFormat(data));
  }

  function sendConflict(res, data) {
    // The request conflicts with another request (perhaps due to using the same idempotent key).
    res.status(409).send(_errorFormat(data));
  }

  function sendTooManyRequests(res, data) {
    // Too many requests hit the API too quickly. Either something went wrong or you need to contact us to increase your rate limit.
    res.status(429).send(_errorFormat(data));
  }

  function sendServerError(res, data) {
    // Something went wrong on Middleware's end. (These are rare.)
    res.status(500).send(_errorFormat(data));
  }

  return {
    sendOk,
    sendBadRequest,
    sendUnauthorized,
    sendRequestFailed,
    sendNotFound,
    sendConflict,
    sendTooManyRequests,
    sendServerError
  };
}

module.exports = httpRespStatusUtil;
