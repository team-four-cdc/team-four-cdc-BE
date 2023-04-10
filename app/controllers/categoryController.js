const CategoryService = require('../services/categoryService');
const { httpRespStatusUtil } = require('../utils');
const status = require('../constants/status');

const getCategoryListing = async (req, res) => {
  const categoryService = new CategoryService();
  try {
    categoryService
      .getListing()
      .then((category) => {
        return httpRespStatusUtil.sendResponse({
          res,
          status: status.HTTP_200_OK,
          message: 'success',
          data: category,
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

module.exports = { getCategoryListing };
