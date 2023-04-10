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

  const articleService = new ArticleService({
    articleModel: db.Article,
    userModel: db.User,
  });

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

const getArticleListing = async (req, res) => {
  const articleService = new ArticleService({
    articleModel: db.Article,
    userModel: db.User,
  });
  try {
    articleService
      .getListing()
      .then((article) => {
        return httpRespStatusUtil.sendResponse({
          res,
          status: status.HTTP_200_OK,
          message: 'success',
          data: article,
        });
      })
      .catch((error) => {
        return httpRespStatusUtil.sendResponse({
          res,
          status: status.HTTP_404_NOT_FOUND,
          message: 'failed',
          error,
        });
      });
  } catch (error) {
    return httpRespStatusUtil.sendResponse({
      res,
      status: status.HTTP_500_INTERNAL_SERVER_ERROR,
      message: 'error occurred',
    });
  }
};

module.exports = { createArticleHandler, getArticleListing };
