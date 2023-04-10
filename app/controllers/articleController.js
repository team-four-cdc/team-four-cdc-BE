const ArticleService = require('../services/articleService');
const { httpRespStatusUtil } = require('../utils');
const { createArticleSchema } = require('../validator/articleValidator');
const db = require('../models');
const status = require('../constants/status');

const createArticleHandler = async (req, res) => {
  const photoArticle = req.file.filename;
  const { title, body, description, price, categoryId } = req.body;
  const { userId } = req.params;

  const { value, error } = createArticleSchema.validate({
    photoArticle,
    title,
    body,
    categoryId,
    description,
    price,
  });

  if (error) {
    return httpRespStatusUtil.sendResponse({
      res,
      status: status.HTTP_400_BAD_REQUEST,
      message: 'Validation Error',
      error,
    });
  }

  const articleService = new ArticleService({ articleModel: db.Article });

  const article = await articleService.createArticle({
    title,
    body,
    publishDate: new Date(),
    authorId: userId,
    photoArticle,
    price,
    categoryId,
  });

  return httpRespStatusUtil.sendResponse({
    res,
    status: status.HTTP_200_OK,
    message: 'Article created',
    data: article,
  });
};

module.exports = { createArticleHandler };
