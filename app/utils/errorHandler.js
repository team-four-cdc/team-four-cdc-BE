function errorHandler() {
  function BadRequest(message) {
    // The request was unacceptable, often due to missing a required parameter.
    this.message = message;
    this.name = 'BadRequest';
    this.codeStatus = 400;
  }

  function Unauthorized(message) {
    // The signature was not valid.
    this.message = message;
    this.name = 'Unauthorized';
    this.codeStatus = 401;
  }

  function RequestFailed(message) {
    // The parameters were valid but the request failed.
    this.message = message;
    this.name = 'RequestFailed';
    this.codeStatus = 403;
  }

  function NotFound(message) {
    // The requested resource doesn't exist.
    this.message = message;
    this.name = 'NotFound';
    this.codeStatus = 404;
  }

  function Conflict(message) {
    // The request conflicts with another request (perhaps due to using the same idempotent key).
    this.message = message;
    this.name = 'Conflict';
    this.codeStatus = 409;
  }

  function TooManyRequests(message) {
    // Too many requests hit the API too quickly. Either something went wrong or you need to contact us to increase your rate limit.
    this.message = message;
    this.name = 'TooManyRequests';
    this.codeStatus = 429;
  }

  function ServerError(message) {
    // Something went wrong on Middleware's end. (These are rare.)
    this.message = message;
    this.name = 'ServerError';
    this.codeStatus = 500;
  }

  return {
    BadRequest,
    Unauthorized,
    RequestFailed,
    NotFound,
    Conflict,
    TooManyRequests,
    ServerError
  };
}

module.exports = errorHandler;
