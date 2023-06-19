const midtransClient = require('midtrans-client');
const { httpRespStatusUtil } = require('../utils');
const status = require('../constants/status');
const { createSnapTransactionSchema } = require('../validator/transactionValidator');

const createSnapTransactionHandler = async (req, res) => {
  const { customerDetails, transactionDetails, creditCard } = req.body;

  const { error } = createSnapTransactionSchema.validate({
    customerDetails,
    transactionDetails,
    creditCard
  });

  if (error) {
    return httpRespStatusUtil.sendResponse({
      res,
      status: status.HTTP_400_BAD_REQUEST,
      message: 'Validation Error',
      error,
    });
  }

  const parameter = {
    customer_details: {
      first_name: customerDetails.firstName,
      last_name: customerDetails.lastName,
      email: customerDetails.email,
      phone: customerDetails.phone,
    },
    transaction_details: {
      order_id: transactionDetails.orderId,
      gross_amount: transactionDetails.grossAmount,
    },
    credit_card: {
      secure: transactionDetails.secure
    }
  };

  try {
    const snap = new midtransClient.Snap({
      isProduction: process.env.MIDTRANS_PRODUCTION,
      serverKey: process.env.MIDTRANS_SERVER_KEY
    });

    const transaction = snap.createTransaction(parameter);
    if (transaction) {
      return httpRespStatusUtil.sendResponse({
        res,
        status: status.HTTP_200_OK,
        message: 'Payment created',
        data: {
          transactionToken: transaction.token,
          redirectUrl: transaction.redirect_url
        },
      });
    }
    return httpRespStatusUtil.sendResponse({
      res,
      status: status.HTTP_400_BAD_REQUEST,
      message: 'Midtrans Error',
      error: error.message,
    });
  } catch (errorCreateMidtransTransaction) {
    if (errorCreateMidtransTransaction.name === 'SequelizeForeignKeyConstraintError') {
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
      errorCreateMidtransTransaction,
    });
  }
};

module.exports = {
  createSnapTransactionHandler,
};
