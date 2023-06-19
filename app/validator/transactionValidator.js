const Joi = require('joi');

const createTransactionSchema = Joi.object({
  accountNumber: Joi.number().required(),
  accountName: Joi.string().required(),
  bankName: Joi.string().required(),
  articleId: Joi.number().required(),
  status: Joi.string().required(),
  userId: Joi.number().required(),
});

module.exports = {
  createTransactionSchema,
};
