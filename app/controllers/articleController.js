const ArticleService = require('../services/articleService');
const { httpRespStatusUtil } = require('../utils');
const status = require('../constants/status');

const getArticleListing = async (req, res) => {
  const articleService = new ArticleService();
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

module.exports = { getArticleListing };
