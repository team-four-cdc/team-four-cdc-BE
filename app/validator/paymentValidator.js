const Joi = require('joi');

const createPaymentSchema = Joi.object({
  amountPaid: Joi.number().required(),
  articleId: Joi.number().required(),
  userId: Joi.number().required(),
});

module.exports = {
    createPaymentSchema,
};
