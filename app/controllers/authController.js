const UserService = require('../services/userService');
const TokenService = require('../services/tokenService');
const { httpRespStatusUtil } = require('../utils');
const db = require('../models');
const { verify } = require('argon2');

const verifyAuthHandler = async (req, res, next) => {
  const { email, password } = req.body;
  const roleList = ['reader', 'creator'];

  if (!roleList.includes(req.params.role)) {
    return httpRespStatusUtil.sendBadRequest(res, {
      status: 'failed',
      message: 'Invalid role',
    });
  }

  if (!(email && password)) {
    return httpRespStatusUtil.sendBadRequest(res, {
      status: 'failed',
      message: 'Invalid request, all input is required',
    });
  }

  const userService = new UserService({ userModel: db.User });
  const tokenService = new TokenService();

  try {
    const user = await userService.findUserEmailByRole({
      email,
      role: req.params.role,
    });

    if (user) {
      const isValid = await verify(user.password, password);
      if (password && isValid) {
        const token = await tokenService.signToken(
          { email: user.email },
          { expiresIn: '1h' }
        );
        return httpRespStatusUtil.sendOk(res, {
          status: 'success',
          message: 'Users authenticated',
          data: {
            token,
          },
        });
      } else {
        return httpRespStatusUtil.sendUnauthorized(res, {
          status: 'failed',
          message: 'Invalid credentials',
        });
      }
    } else {
      return httpRespStatusUtil.sendBadRequest(res, {
        status: 'failed',
        message: 'Invalid request, user not valid',
      });
    }
  } catch (error) {
    return httpRespStatusUtil.sendServerError(res, {
      status: 'failed',
      msg: 'error occurred',
    });
  }
};

module.exports = { verifyAuthHandler };
