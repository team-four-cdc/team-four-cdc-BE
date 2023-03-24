const jwt = require('jsonwebtoken');
const { httpRespStatusUtil } = require('../utils');

const authJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.SECRET, (err, user) => {
      if (err) {
        return httpRespStatusUtil.sendRequestFailed({
          status: 'failed',
          message: 'Request Failed, invalid token!',
        });
      }

      req.user = user;
      next();
    });
  } else {
    return httpRespStatusUtil.sendUnauthorized({
      status: 'failed',
      message: 'Unauthorized user',
    });
  }
};

module.exports = { authJWT };
