const { verify } = require('argon2');
const UserService = require('../services/userService');
const AuthService = require('../services/authService');
const TokenService = require('../services/tokenService');
const {
  passwordUsersSchema,
  forgotPasswordSchema,
} = require('../validator/userValidator');
const { httpRespStatusUtil } = require('../utils');
const {
  loginUserSchema,
  verifyUserSchema,
} = require('../validator/userValidator');
const db = require('../models');
const status = require('../constants/status');

const verifyAuthHandler = async (req, res) => {
  const { email, password } = req.body;
  const { role } = req.params;

  const userService = new UserService({ userModel: db.User });

  const { error } = loginUserSchema.validate({ email, password, role });

  if (error) {
    return httpRespStatusUtil.sendResponse({
      res,
      status: status.HTTP_400_BAD_REQUEST,
      message: 'Validation Error',
      error,
    });
  }

  const tokenService = new TokenService({ tokenModel: db.token });

  try {
    const user = await userService.findUserEmailByRole({
      email,
      role,
    });

    if (user) {
      const userId = user.id;
      const fullName = user.full_name;
      const isValid = await verify(user.password, password);
      if (password && isValid) {
        const token = await tokenService.signToken(
          { email, role, userId },
          { expiresIn: '1d' }
        );

        return httpRespStatusUtil.sendResponse({
          res,
          status: status.HTTP_200_OK,
          message: 'Users authenticated',
          data: {
            token,
            fullName
          },
        });
      }
      return httpRespStatusUtil.sendResponse({
        res,
        status: status.HTTP_401_UNAUTHORIZED,
        message: 'Invalid credentials',
      });
    }
    return httpRespStatusUtil.sendResponse({
      res,
      status: status.HTTP_400_BAD_REQUEST,
      message: 'Invalid request, user not valid',
    });
  } catch (errorVerifyAuth) {
    return httpRespStatusUtil.sendResponse({
      res,
      status: status.HTTP_500_INTERNAL_SERVER_ERROR,
      message: 'Error occured',
    });
  }
};

const forgotPasswordWithEmailHandler = async (req, res) => {
  const { email } = req.body;
  const { role } = req.params;

  const { error } = forgotPasswordSchema.validate({ email, role });

  if (error) {
    return httpRespStatusUtil.sendResponse({
      res,
      status: status.HTTP_400_BAD_REQUEST,
      message: 'Validation Error',
      error,
    });
  }

  const authService = new AuthService({ userModel: db.User });
  const userService = new UserService({ userModel: db.User });

  try {
    const user = await userService.findUserEmailByRole({
      email,
      role,
    });

    if (!user) {
      return httpRespStatusUtil.sendResponse({
        res,
        status: status.HTTP_404_NOT_FOUND,
        message: 'Email not found',
      });
    }

    const result = await authService.sendEmail(user);

    if (result) {
      return httpRespStatusUtil.sendResponse({
        res,
        status: status.HTTP_200_OK,
        message: 'Reset password has been send to your email',
      });
    }
    return httpRespStatusUtil.sendResponse({
      res,
      status: status.HTTP_500_INTERNAL_SERVER_ERROR,
      message: 'Email not sent',
    });
  } catch (errorForgotPassword) {
    return httpRespStatusUtil.sendResponse({
      res,
      status: status.HTTP_500_INTERNAL_SERVER_ERROR,
      message: 'Error occured',
    });
  }
};

const updatePasswordHandler = async (req, res) => {
  const { newPassword, resetPasswordToken } = req.body;
  const authService = new AuthService({ userModel: db.User });

  try {
    const { error } = passwordUsersSchema.validate({
      newPassword,
      resetPasswordToken,
    });

    if (error) {
      return httpRespStatusUtil.sendResponse({
        res,
        status: status.HTTP_400_BAD_REQUEST,
        message: 'Validation Error',
        error,
      });
    }

    const { success, error: resetErr } = await authService.resetPassword({
      newPassword,
      resetPasswordToken,
    });

    if (success) {
      return httpRespStatusUtil.sendResponse({
        res,
        status: status.HTTP_200_OK,
        message: 'Reset password successfully',
      });
    }
    return httpRespStatusUtil.sendResponse({
      res,
      status: status.HTTP_400_BAD_REQUEST,
      message: resetErr.message,
    });
  } catch (errorUpdatePassword) {
    return httpRespStatusUtil.sendResponse({
      res,
      status: status.HTTP_500_INTERNAL_SERVER_ERROR,
      message: 'Error occured',
    });
  }
};

const refreshTokenHandler = async (req, res) => {
  const { token } = req.body;
  const { role } = req.params;

  const { error } = verifyUserSchema.validate({
    token,
    role,
  });

  if (error) {
    return httpRespStatusUtil.sendResponse({
      res,
      status: status.HTTP_400_BAD_REQUEST,
      message: 'Validation Error',
      error,
    });
  }

  const tokenService = new TokenService({ tokenModel: db.token });

  try {
    const userPayload = await tokenService.verifyToken({ token });

    if (role !== userPayload.role) {
      return httpRespStatusUtil.sendResponse({
        res,
        status: status.HTTP_400_BAD_REQUEST,
        message: 'Verify token error, role mismatch',
      });
    }
    try {
      const signToken = await tokenService.signToken(
        {
          email: userPayload.email,
          role: userPayload.role,
          userId: userPayload.userId,
        },
        { expiresIn: '15d' }
      );

      return httpRespStatusUtil.sendResponse({
        res,
        status: status.HTTP_200_OK,
        message: 'Token Refreshed',
        data: {
          signToken,
        },
      });
    } catch (errorRefreshToken) {
      return httpRespStatusUtil.sendResponse({
        res,
        status: status.HTTP_500_INTERNAL_SERVER_ERROR,
        message: 'Error occured',
      });
    }
  } catch (errorRefreshToken) {
    return httpRespStatusUtil.sendResponse({
      res,
      status: status.HTTP_400_BAD_REQUEST,
      message: 'Verify token error',
      error,
    });
  }
};

module.exports = {
  verifyAuthHandler,
  forgotPasswordWithEmailHandler,
  updatePasswordHandler,
  refreshTokenHandler,
};
