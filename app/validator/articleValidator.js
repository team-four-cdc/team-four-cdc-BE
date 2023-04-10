const Joi = require('joi');

const createArticleSchema = Joi.object({
  photoArticle: Joi.string().required(),
  title: Joi.string().required(),
  body: Joi.string().required(),
  categoryId: Joi.number().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
});

module.exports = {
  createArticleSchema,
};
