const jwt = require('jsonwebtoken');
const { httpRespStatusUtil } = require('../utils');
const status = require('../constants/status');

const authJWT = (req, res, next) => {
  const authHeader = req.headers?.authorization || null;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.SECRET, (err, user) => {
      if (err) {
        return httpRespStatusUtil.sendResponse({
          res,
          status: status.HTTP_403_FORBIDDEN,
          message: 'Request Failed, invalid token!',
        });
      }

      req.user = user;
      next();
    });
  } else {
    return httpRespStatusUtil.sendResponse({
      res,
      status: status.HTTP_401_UNAUTHORIZED,
      message: 'Unauthorized user',
    });
  }
};

module.exports = { authJWT };
