const UserService = require("../services/userService");
const MailService = require("../services/mailService");
const TokenService = require("../services/tokenService");
const {
  registerUserSchema,
  verifyUserSchema,
} = require("../validator/userValidator");
const { httpRespStatusUtil } = require("../utils");
const db = require("../models");

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
    return httpRespStatusUtil.sendBadRequest(res, {
      status: "failed",
      message: "Invalid request",
      data: error,
    });
  }

  const userService = new UserService({ userModel: db.User });
  const mailService = new MailService();
  const tokenService = new TokenService();

  const user = await userService.findDuplicateUser({
    email: value.email,
    role: value.role,
  });

  if (user) {
    return httpRespStatusUtil.sendBadRequest(res, {
      status: "failed",
      message: "User already exists",
    });
  }

  try {
    const token = await tokenService.signToken({ email: value.email });
    const result = await userService.createUser({ ...value, token });

    mailService.sendVerificationEmail({ to: value.email, token });

    return httpRespStatusUtil.sendOk(res, {
      status: "success",
      msg: `User ${value.email} created`,
    });
  } catch (error) {
    return httpRespStatusUtil.sendServerError(res, {
      status: "failed",
      msg: "error occurred",
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
    return httpRespStatusUtil.sendBadRequest(res, {
      status: "failed",
      message: "Invalid request",
      data: error,
    });
  }

  const userService = new UserService({ userModel: db.User });

  try {
    const user = await userService.findUserByToken({ token: value.token });

    if (user) {
      await userService.verifyUser(user);
      return httpRespStatusUtil.sendOk(res, {
        status: "success",
        msg: "User verified",
      });
    } else {
      return httpRespStatusUtil.sendNotFound(res, {
        status: "failed",
        msg: "Can't find user",
      });
    }
  } catch (error) {
    return httpRespStatusUtil.sendServerError(res, {
      status: "failed",
      msg: "error occurred",
    });
  }
};

module.exports = { createUserController, verifyUserController };
