const UserService = require("../services/userService");
const MailService = require("../services/mailService");
const TokenService = require("../services/tokenService");
const UserValidator = require("../validator/userValidator");
const { httpRespStatusUtil } = require("../utils");
const db = require("../models");

const createUserController = async (req, res) => {
  const { email, password, full_name, role, author } = req.body;

  const validationResult = UserValidator.validate({
    email,
    password,
    full_name,
    role,
    author,
  });

  const { value, error } = validationResult;

  if (error) {
    return httpRespStatusUtil.sendOk(res, {
      status: "failed",
      message: "Invalid request",
      data: error,
    });
  }

  const userService = new UserService({ userModel: db.User });
  const mailService = new MailService();
  const tokenService = new TokenService();

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

  if (!token) {
    return httpRespStatusUtil.sendOk(res, {
      status: "failed",
      message: "Invalid request, token must exists",
    });
  }

  const userService = new UserService({ userModel: db.User });

  try {
    const user = await userService.findUserByToken({ token });

    if (user) {
      await userService.verifyUser(user);
      return httpRespStatusUtil.sendOk(res, {
        status: "success",
        msg: "User verified",
      });
    } else {
      return httpRespStatusUtil.sendServerError(res, {
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
