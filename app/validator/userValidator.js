const Joi = require('joi');

const passwordSchema = Joi.string()
  .min(8)
  .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
  .required();

const registerUserSchema = Joi.object({
  email: Joi.string().email({ tlds: false }).required(),
  password: passwordSchema,
  full_name: Joi.string().required(),
  role: Joi.string().valid('reader', 'creator').required(),
  author: Joi.any().when('role', {
    is: 'creator',
    then: Joi.string().required(),
    otherwise: Joi.optional(),
  }),
});

const verifyUserSchema = Joi.object({
  token: Joi.string().required(),
});

const passwordUsersSchema = Joi.object({
  password: passwordSchema,
});

module.exports = { registerUserSchema, verifyUserSchema, passwordUsersSchema };
