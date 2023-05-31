const ArticleService = require('../services/articleService');
const TransactionService = require('../services/transactionService');
const { httpRespStatusUtil } = require('../utils');
const { createArticleSchema } = require('../validator/articleValidator');
const db = require('../models');
const status = require('../constants/status');

const getDashboard = async (req, res) => {
  const { userId } = req.query;

  const articleService = new ArticleService({
    articleModel: db.Article,
    userModel: db.User,
  });

  const transactionService = new TransactionService({
    transactionModel: db.Transaction,
    articleModel: db.Article,
    userModel: db.User,
  });

  try {
    const articles = await articleService.getRandomListing({userId})
    const articleIds = []
    articles.forEach(article => {
      articleIds.push(article.id)
    });
    const transactions = await transactionService.getDashboardTransaction({articleIds})
    transactions.forEach(transaction => {
     console.log('transaction',transaction)
    });
    return httpRespStatusUtil.sendResponse({
      res,
      status: status.HTTP_200_OK,
      message: 'success',
      data: {
        topArticles:articles,
        transactions:transactions
      },
    });
  } catch (error) {
    console.log("ERROR", error)
    return httpRespStatusUtil.sendResponse({
      res,
      status: status.HTTP_500_INTERNAL_SERVER_ERROR,
      message: 'error occurred',
    });
  }
};

const getArticleListing = async (req, res) => {
  const { userId } = req.query;

  const articleService = new ArticleService({
    articleModel: db.Article,
    userModel: db.User,
  });

  try {
    articleService
      .getListing({ userId })
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
}

const createArticleHandler = async (req, res) => {
  const { filename: photoArticle } = req.file;
  const { title, body, description, price, categoryId, authorId } = req.body;

  const { error } = createArticleSchema.validate({
    photoArticle,
    title,
    body,
    description,
    price,
    categoryId,
    authorId,
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

  try {
    const article = await articleService.createArticle({
      title,
      body,
      publishDate: new Date(),
      authorId,
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
  } catch (error) {
    console.log(error);

    if (error.name === 'SequelizeForeignKeyConstraintError') {
      return httpRespStatusUtil.sendResponse({
        res,
        status: status.HTTP_400_BAD_REQUEST,
        message: 'Foreign key is not exist',
      });
    } else {
      return httpRespStatusUtil.sendResponse({
        res,
        status: status.HTTP_500_INTERNAL_SERVER_ERROR,
        message: 'error occurred',
        error: error,
      });
    }
  }
};

const updateArticleHandler = async (req, res) => {
  const { articleId } = req.params;
  const { title, body, description, price } = req.body;

  const articleService = new ArticleService({
    articleModel: db.Article,
    userModel: db.User,
  });

  try {
    const article = await articleService.updateArticle({
      articleId,
      title,
      body,
      description,
      price,
    });

    return httpRespStatusUtil.sendResponse({
      res,
      status: status.HTTP_200_OK,
      message: 'Article updated',
      data: article,
    });
  } catch (error) {
    console.log(error);

    if (error.name === 'SequelizeForeignKeyConstraintError') {
      return httpRespStatusUtil.sendResponse({
        res,
        status: status.HTTP_400_BAD_REQUEST,
        message: 'Foreign key is not exist',
      });
    } else {
      return httpRespStatusUtil.sendResponse({
        res,
        status: status.HTTP_500_INTERNAL_SERVER_ERROR,
        message: 'error occurred',
        error: error,
      });
    }
  }
};

const deleteArticleHandler = async (req, res) => {
  const { articleId } = req.params;

  const articleService = new ArticleService({
    articleModel: db.Article,
    userModel: db.User,
  });

  try {
    const article = await articleService.deleteArticle({
      articleId,
    });

    return httpRespStatusUtil.sendResponse({
      res,
      status: status.HTTP_200_OK,
      message: 'Article deleted',
      data: article,
    });
  } catch (error) {
    console.log(error);

    return httpRespStatusUtil.sendResponse({
      res,
      status: status.HTTP_500_INTERNAL_SERVER_ERROR,
      message: 'error occurred',
      error: error,
    });
  }
};

module.exports = {
  createArticleHandler,
  getArticleListing,
  updateArticleHandler,
  deleteArticleHandler,
  getDashboard
};
