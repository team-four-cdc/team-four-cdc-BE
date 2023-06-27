const Joi = require('joi');

const createTransactionSchema = Joi.object({
  accountNumber: Joi.number().required(),
  accountName: Joi.string().required(),
  bankName: Joi.string().required(),
  articleId: Joi.number().required(),
  status: Joi.string().required(),
  userId: Joi.number().required(),
});

const createSnapTransactionSchema = Joi.object({
  customerDetails: Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
  }),
  transactionDetails: Joi.object({
    orderId: Joi.string().required(),
    grossAmount: Joi.number().required(),
  }),
  creditCard: Joi.object({
    secure: Joi.bool().required()
  })
});

module.exports = {
  createTransactionSchema,
  createSnapTransactionSchema,
};
