const CategoryService = require('../services/categoryService');
const { httpRespStatusUtil } = require('../utils');
const { createCategorySchema } = require('../validator/categoryValidator');
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

const createCategoryHandler = async (req, res) => {
  const { name } = req.body;
  const { error } = createCategorySchema.validate({
   name
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

module.exports = { 
  getCategoryListing,
  createCategoryHandler
};
