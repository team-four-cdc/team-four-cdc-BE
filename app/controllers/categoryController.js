const CategoryService = require('../services/categoryService');
const { httpRespStatusUtil } = require('../utils');
const { createCategorySchema } = require('../validator/categoryValidator');
const status = require('../constants/status');

const getCategoryListing = async (nil, res) => {
  const categoryService = new CategoryService();
  try {
    const category = await categoryService.getListing();
    if (category) {
      return httpRespStatusUtil.sendResponse({
        res,
        status: status.HTTP_200_OK,
        message: 'success',
        data: category,
      });
    }
    return httpRespStatusUtil.sendResponse({
      res,
      status: status.HTTP_404_NOT_FOUND,
      message: 'failed',
    });
  } catch (errorCategoryListing) {
    return httpRespStatusUtil.sendResponse({
      res,
      status: status.HTTP_500_INTERNAL_SERVER_ERROR,
      message: 'error occurred',
    });
  }
};

const createCategoryHandler = async (req, res) => {
  const { name } = req.body;
  const { error } = createCategorySchema.validate({
    name,
  });

  if (error) {
    return httpRespStatusUtil.sendResponse({
      res,
      status: status.HTTP_400_BAD_REQUEST,
      message: 'Validation Error',
      error,
    });
  }

  const categoryService = new CategoryService();

  try {
    const category = await categoryService.createCategory({
      name,
    });

    return httpRespStatusUtil.sendResponse({
      res,
      status: status.HTTP_200_OK,
      message: 'Category created',
      data: category,
    });
  } catch (errorCreateCategory) {
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

module.exports = {
  getCategoryListing,
  createCategoryHandler,
};
