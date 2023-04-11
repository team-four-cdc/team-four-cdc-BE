const Joi = require('joi');

const createArticleSchema = Joi.object({
  photoArticle: Joi.string().required(),
  title: Joi.string().required(),
  body: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  categoryId: Joi.number().required(),
  authorId: Joi.number().required(),
});

module.exports = {
  createArticleSchema,
};
