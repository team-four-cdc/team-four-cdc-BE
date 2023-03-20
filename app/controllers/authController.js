const UserService = require('../services/userService');
const AuthService = require('../services/authService');
const TokenService = require('../services/tokenService');
const { passwordUsersSchema } = require('../validator/userValidator');
const { httpRespStatusUtil } = require('../utils');
const db = require('../models');
const { verify } = require('argon2');

const checkValidRole = async (req, res) => {
  const roleList = ['reader', 'creator'];

  if (!roleList.includes(req.params.role)) {
    return httpRespStatusUtil.sendBadRequest(res, {
      status: 'failed',
      message: 'Invalid role',
    });
  }
};

const verifyAuthHandler = async (req, res, next) => {
  const { email, password } = req.body;

  await checkValidRole(req, res);

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

const forgotPasswordWithEmailHandler = async (req, res, next) => {
  const { email } = req.body;
  const authService = new AuthService({ userModel: db.User });
  const userService = new UserService({ userModel: db.User });

  await checkValidRole(req, res);

  try {
    const checkUser = await userService.findUserEmailByRole({
      email,
      role: req.params.role,
    });
    if (!checkUser) {
      return httpRespStatusUtil.sendBadRequest(res, {
        status: 'failed',
        msg: 'Email not found!',
      });
    }

    const result = await authService.sendEmail(checkUser);
    if (result) {
      return httpRespStatusUtil.sendOk(res, {
        status: 'success',
        msg: 'Email has been send to your email',
      });
    }
  } catch (error) {
    return httpRespStatusUtil.sendServerError(res, {
      status: 'failed',
      msg: 'error occurred',
    });
  }
};

const updatePasswordHandler = async (req, res) => {
  const { newPassword, resetPasswordToken } = req.body;
  const authService = new AuthService({ userModel: db.User });

  try {
    const validationResult = passwordUsersSchema.validate({
      password: newPassword,
    });

    const { value, error } = validationResult;
    if (error) {
      return httpRespStatusUtil.sendBadRequest(res, {
        status: 'failed',
        message: 'Invalid request',
        data: error,
      });
    }

    const result = await authService.resetPassword({
      newPassword: value.password,
      resetPasswordToken,
    });

    if (result) {
      console.log(result);
      return httpRespStatusUtil.sendOk(res, {
        status: 'success',
        msg: 'Reset password successfully',
      });
    }
    // return response('success', result);
  } catch (error) {
    return httpRespStatusUtil.sendServerError(res, {
      status: 'failed',
      msg: 'error occurred',
    });
  }
};

module.exports = {
  verifyAuthHandler,
  forgotPasswordWithEmailHandler,
  updatePasswordHandler,
};
