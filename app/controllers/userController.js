const UserService = require('../services/userService');
const MailService = require('../services/mailService');
const TokenService = require('../services/tokenService');
const {
  registerUserSchema,
  verifyUserSchema,
} = require('../validator/userValidator');
const { httpRespStatusUtil } = require('../utils');
const db = require('../models');
const status = require('../constants/status');

const createUserController = async (req, res) => {
  const { email, password, full_name, role, author } = req.body;

  const validationResult = registerUserSchema.validate({
    email,
    password,
    full_name,
    role,
    author,
  });

  const { value, error } = validationResult;

  if (error) {
    return httpRespStatusUtil.sendResponse({
      res,
      status: status.HTTP_400_BAD_REQUEST,
      message: 'Validation Error',
      error,
    });
  }

  const userService = new UserService({ userModel: db.User });
  const mailService = new MailService();
  const tokenService = new TokenService({ tokenModel: db.Token });

  const user = await userService.findDuplicateUser({
    email: value.email,
    role: value.role,
  });

  if (user) {
    return httpRespStatusUtil.sendBadRequest(res, {
      status: 'failed',
      message: 'User already exists',
    });
  }

  try {
    const token = await tokenService.signToken({ email: value.email });
    const result = await userService.createUser({ ...value, token });

    if (result.error) {
      return httpRespStatusUtil.sendResponse({
        res,
        status: status.HTTP_500_INTERNAL_SERVER_ERROR,
        message: result.error.message,
        error: result.error,
      });
    }

    mailService.sendVerificationEmail({ to: value.email, token });

    return httpRespStatusUtil.sendResponse({
      res,
      status: status.HTTP_200_OK,
      message: `User ${value.email} created`,
      error: null,
    });
  } catch (error) {
    console.log(error);
    return httpRespStatusUtil.sendResponse({
      res,
      status: status.HTTP_500,
      message: 'Error occured',
      error,
    });
  }
};

const verifyUserController = async (req, res) => {
  const { token } = req.body;

  const validationResult = verifyUserSchema.validate({
    token,
  });

  const { value, error } = validationResult;

  if (error) {
    return httpRespStatusUtil.sendResponse({
      res,
      status: status.HTTP_400_BAD_REQUEST,
      message: 'Invalid request',
      error,
    });
  }

  const userService = new UserService({ userModel: db.User });

  try {
    const user = await userService.findUserByToken({ token: value.token });

    if (user) {
      await userService.verifyUser(user);
      return httpRespStatusUtil.sendOk(res, {
        status: 'success',
        message: 'User verified',
      });
    } else {
      return httpRespStatusUtil.sendNotFound(res, {
        status: 'failed',
        message: "Can't find user",
      });
    }
  } catch (error) {
    return httpRespStatusUtil.sendServerError(res, {
      status: 'failed',
      message: 'error occurred',
    });
  }
};

module.exports = { createUserController, verifyUserController };
