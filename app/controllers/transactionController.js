const TransactionService = require('../services/transactionService');
const { httpRespStatusUtil } = require('../utils');
const { createTransactionSchema } = require('../validator/transactionValidator');
const db = require('../models');
const status = require('../constants/status');


const createTransactionHandler = async (req, res) => {

  const { accountNumber,accountName,bankName,articleId,status,userId } = req.body;

  const { error } = createTransactionSchema.validate({
    accountNumber,
    accountName,
    bankName,
    articleId,
    status,
    userId
  });


  if (error) {
    return httpRespStatusUtil.sendResponse({
      res,
      status: status.HTTP_400_BAD_REQUEST,
      message: 'Validation Error',
      error,
    });
  }

  const transactionService = new TransactionService({
    transactionModel: db.Transaction,
    articleModel: db.Article,
    userModel: db.User,
  });

  try {
    const payment = await transactionService.createTransaction({
      account_number : accountNumber,
      account_name : accountName,
      bank_name: bankName,
      article_id: articleId,
      status: status,
      user_id: userId
    });

    return httpRespStatusUtil.sendResponse({
      res,
      status: status.HTTP_200_OK,
      message: 'Payment created',
      data: payment,
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
  createTransactionHandler,
};
