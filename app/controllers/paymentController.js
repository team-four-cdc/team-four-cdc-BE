const PaymentService = require('../services/paymentService');
const { httpRespStatusUtil } = require('../utils');
const { createPaymentSchema } = require('../validator/paymentValidator');
const db = require('../models');
const status = require('../constants/status');


const createPaymentHandler = async (req, res) => {
  const { amountPaid,articleId,userId } = req.body;

  const { error } = createPaymentSchema.validate({
    amountPaid,
    articleId,
    userId,
  });

  if (error) {
    return httpRespStatusUtil.sendResponse({
      res,
      status: status.HTTP_400_BAD_REQUEST,
      message: 'Validation Error',
      error,
    });
  }

  const paymentService = new PaymentService({
    paymentModel: db.Payments,
    articleModel: db.Article,
    userModel: db.User,
  });

  try {
    const payment = await paymentService.createPayment({
      userId,
      articleId,
      amountPaid,
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
  createPaymentHandler,
};
