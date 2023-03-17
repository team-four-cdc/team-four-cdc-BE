const Joi = require("joi");

const schema = Joi.object({
  email: Joi.string().email({ tlds: false }).required(),
  password: Joi.string()
    .min(8)
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required(),
  full_name: Joi.string().required(),
  role: Joi.string().valid("reader", "creator").required(),
  author: Joi.string().required(),
});

module.exports = schema;
