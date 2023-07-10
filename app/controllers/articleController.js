const ArticleService = require('../services/articleService');
const TransactionService = require('../services/transactionService');
const { httpRespStatusUtil } = require('../utils');
const { createArticleSchema } = require('../validator/articleValidator');
const db = require('../models');
const status = require('../constants/status');

const getDashboard = async (req, res) => {
  const { userId } = req.query;

  const articleService = new ArticleService({
    transactionModel: db.Transaction,
    articleModel: db.Article,
    userModel: db.User,
  });

  const transactionService = new TransactionService({
    transactionModel: db.Transaction,
    articleModel: db.Article,
    userModel: db.User,
  });

  try {
    const articles = await articleService.getRandomListing({ userId });
    const articleIds = [];
    if (articles) {
      articles.forEach((article) => {
        articleIds.push(article.id);
      });
    }
    const transactions = await transactionService.getDashboardTransaction({ articleIds });
    if (transactions) {
      return httpRespStatusUtil.sendResponse({
        res,
        status: status.HTTP_200_OK,
        message: 'success',
        data: {
          topArticles: articles,
          transactions
        },
      });
    }
    return httpRespStatusUtil.sendResponse({
      res,
      status: status.HTTP_500_INTERNAL_SERVER_ERROR,
      message: 'transaction not found',
    });
  } catch (error) {
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
    const article = await articleService.getListing({ userId });
    if (article) {
      return httpRespStatusUtil.sendResponse({
        res,
        status: status.HTTP_200_OK,
        message: 'success',
        data: article,
      });
    }
    return httpRespStatusUtil.sendResponse({
      res,
      status: status.HTTP_404_NOT_FOUND,
      message: 'failed',
    });
  } catch (error) {
    return httpRespStatusUtil.sendResponse({
      res,
      status: status.HTTP_500_INTERNAL_SERVER_ERROR,
      message: 'error occurred',
    });
  }
};

const getArticleListingByCategory = async (req, res) => {
  const { categoryId, limit } = req.query;

  const articleService = new ArticleService({
    articleModel: db.Article,
    userModel: db.User,
    categoryModel: db.Category,
  });

  try {
    const article = await articleService.getListingByCategory({ limit, categoryId });
    if (article) {
      return httpRespStatusUtil.sendResponse({
        res,
        status: status.HTTP_200_OK,
        message: 'success',
        data: article,
      });
    }
    return httpRespStatusUtil.sendResponse({
      res,
      status: status.HTTP_404_NOT_FOUND,
      message: 'failed',
    });
  } catch (error) {
    console.log(error)
    return httpRespStatusUtil.sendResponse({
      res,
      status: status.HTTP_500_INTERNAL_SERVER_ERROR,
      message: 'error occurred',
    });
  }
};

const getUnboughtList = async (req, res) => {
  const { userId, limit } = req.query;

  const articleService = new ArticleService({
    articleModel: db.Article,
    userModel: db.User,
    transactionModel: db.Transaction
  });

  try {
    const article = await articleService.getUnboughtList({ userId, limit });
    if (article) {
      return httpRespStatusUtil.sendResponse({
        res,
        status: status.HTTP_200_OK,
        message: 'success',
        data: article,
      });
    }
    return httpRespStatusUtil.sendResponse({
      res,
      status: status.HTTP_404_NOT_FOUND,
      message: 'failed',
    });
  } catch (error) {
    console.log(error.message)
    return httpRespStatusUtil.sendResponse({
      res,
      status: status.HTTP_500_INTERNAL_SERVER_ERROR,
      message: 'error occurred',
    });
  }
};

const createArticleHandler = async (req, res) => {
  const { filename: photoArticle } = req.file;
  const {
    title, body, description, price, categoryId, authorId
  } = req.body;

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
  } catch (errorCreateArticle) {
    if (errorCreateArticle.name === 'SequelizeForeignKeyConstraintError') {
      return httpRespStatusUtil.sendResponse({
        res,
        status: status.HTTP_400_BAD_REQUEST,
        message: 'Foreign key is not exist',
      });
    }
    return httpRespStatusUtil.sendResponse({
      res,
      status: status.HTTP_500_INTERNAL_SERVER_ERROR,
      message: 'error occurred',
      errorCreateArticle,
    });
  }
};

const updateArticleHandler = async (req, res) => {
  const { articleId } = req.params;
  const {
    title, body, description, price
  } = req.body;

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
    if (error.name === 'SequelizeForeignKeyConstraintError') {
      return httpRespStatusUtil.sendResponse({
        res,
        status: status.HTTP_400_BAD_REQUEST,
        message: 'Foreign key is not exist',
      });
    }
    return httpRespStatusUtil.sendResponse({
      res,
      status: status.HTTP_500_INTERNAL_SERVER_ERROR,
      message: 'error occurred',
      error,
    });
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
    return httpRespStatusUtil.sendResponse({
      res,
      status: status.HTTP_500_INTERNAL_SERVER_ERROR,
      message: 'error occurred',
      error,
    });
  }
};

const getDetailArticle = async (req, res) => {
  const { articleId } = req.params;
  const { userId } = req.user;

  const articleService = new ArticleService({
    articleModel: db.Article,
    userModel: db.User,
    categoryModel: db.Category,
  });

  const transactionService = new TransactionService({
    transactionModel: db.Transaction,
    articleModel: db.Article,
    userModel: db.User,
  });

  try {
    const article = await articleService.getDetailArticle(articleId);

    if (!article) {
      return httpRespStatusUtil.sendResponse({
        res,
        status: status.HTTP_404_NOT_FOUND,
        message: 'Article details with that Id not found',
        data: article,
      });
    }

    if (req.user.role === 'reader') {
      const checkOwnedArticle = await transactionService.checkOwnedArticle(userId, articleId);
      if (!checkOwnedArticle) {
        article.body = `notOwned ${article.body}`.slice(0, 50) + "..."
        return httpRespStatusUtil.sendResponse({
          res,
          status: status.HTTP_200_OK,
          message: 'Article details retrieved successfully',
          data: article
        });
      }

      article.total_clicks = article.dataValues.total_clicks + 1;
      const increaseTotalClick = await articleService.updateArticle({
        articleId,
        total_clicks: article.total_clicks,
      });

      if (!increaseTotalClick) {
        return httpRespStatusUtil.sendResponse({
          res,
          status: status.HTTP_400_BAD_REQUEST,
          message: 'Failed to increase article total clicks',
          data: null
        });
      }
    } else {
      const checkCreatorArticle = await articleService.checkCreatedArticle(req.user.userId, articleId);
      if (!checkCreatorArticle) {
        return httpRespStatusUtil.sendResponse({
          res,
          status: status.HTTP_403_FORBIDDEN,
          message: 'Access denied. You are not the creator of this article',
          data: null
        });
      }
    }

    return httpRespStatusUtil.sendResponse({
      res,
      status: status.HTTP_200_OK,
      message: 'Article details retrieved successfully',
      data: article,
    });
  } catch (error) {
    console.log(error.message)
    return httpRespStatusUtil.sendResponse({
      res,
      status: status.HTTP_500_INTERNAL_SERVER_ERROR,
      message: 'error occurred',
      error,
    });
  }
};

const getRandomArticleByAuthor = async (req, res) => {
  const { authorId, limit } = req.query;

  const articleService = new ArticleService({
    articleModel: db.Article,
    userModel: db.User,
    categoryModel: db.Category,
  });

  try {
    const article = await articleService.getRandomListingByAuthorId({ authorId, limit });

    if (!article) {
      return httpRespStatusUtil.sendResponse({
        res,
        status: status.HTTP_404_NOT_FOUND,
        message: 'Article details with that Id not found',
        data: article,
      });
    }

    return httpRespStatusUtil.sendResponse({
      res,
      status: status.HTTP_200_OK,
      message: 'Random Articles retrieved successfully',
      data: article,
    });
  } catch (error) {
    return httpRespStatusUtil.sendResponse({
      res,
      status: status.HTTP_500_INTERNAL_SERVER_ERROR,
      message: 'error occurred',
      error,
    });
  }
};

const getPopularArticles = async (req, res) => {
  const articleService = new ArticleService({
    articleModel: db.Article,
    userModel: db.User,
    categoryModel: db.Category,
  });

  const { limit = 10 } = req.query;
  if (!typeof limit == 'number' || limit <= 0) {
    return httpRespStatusUtil.sendResponse({
      res,
      status: status.HTTP_400_BAD_REQUEST,
      message: 'Invalid limit value',
    });
  }

  try {
    const article = await articleService.getPopularArticles(limit);

    if (!article || article.length === 0) {
      return httpRespStatusUtil.sendResponse({
        res,
        status: status.HTTP_204_NO_CONTENT,
        message: 'No articles found',
      });
    }

    return httpRespStatusUtil.sendResponse({
      res,
      status: status.HTTP_200_OK,
      message: 'Articles retrieved successfully',
      data: article,
    });
  } catch (error) {
    return httpRespStatusUtil.sendResponse({
      res,
      status: status.HTTP_500_INTERNAL_SERVER_ERROR,
      message: 'error occurred',
      error,
    });
  }
};

const getNewestArticles = async (req, res) => {
  const articleService = new ArticleService({
    articleModel: db.Article,
    userModel: db.User,
    categoryModel: db.Category,
  });

  const { limit = 10 } = req.query;
  if (!typeof limit == 'number' || limit <= 0) {
    return httpRespStatusUtil.sendResponse({
      res,
      status: status.HTTP_400_BAD_REQUEST,
      message: 'Invalid limit value',
    });
  }

  try {
    const article = await articleService.getNewestArticles(limit);

    if (!article || article.length === 0) {
      return httpRespStatusUtil.sendResponse({
        res,
        status: status.HTTP_204_NO_CONTENT,
        message: 'No articles found',
      });
    }

    return httpRespStatusUtil.sendResponse({
      res,
      status: status.HTTP_200_OK,
      message: 'Articles retrieved successfully',
      data: article,
    });
  } catch (error) {
    return httpRespStatusUtil.sendResponse({
      res,
      status: status.HTTP_500_INTERNAL_SERVER_ERROR,
      message: 'error occurred',
      error,
    });
  }
};

const getListOwnedArticle = async (req, res) => {
  const { userId } = req.query;

  const transactionService = new TransactionService({
    transactionModel: db.Transaction,
    articleModel: db.Article,
    userModel: db.User,
  });

  try {
    const transactions = await transactionService.getlistOwnedArticle({ userId });
    if (transactions) {
      return httpRespStatusUtil.sendResponse({
        res,
        status: status.HTTP_200_OK,
        message: 'success',
        data: {
          transactions
        },
      });
    }
    return httpRespStatusUtil.sendResponse({
      res,
      status: status.HTTP_400_BAD_REQUEST,
      message: 'Owned article is not found',
    });
  } catch (error) {
    return httpRespStatusUtil.sendResponse({
      res,
      status: status.HTTP_500_INTERNAL_SERVER_ERROR,
      message: 'error occurred',
      error,
    });
  }
};

module.exports = {
  createArticleHandler,
  getArticleListing,
  updateArticleHandler,
  deleteArticleHandler,
  getDashboard,
  getDetailArticle,
  getPopularArticles,
  getListOwnedArticle,
  getRandomArticleByAuthor,
  getUnboughtList,
  getNewestArticles,
  getArticleListingByCategory
};
