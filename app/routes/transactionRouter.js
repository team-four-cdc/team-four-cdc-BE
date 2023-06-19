const express = require('express');
const router = express.Router();
const { transactionController } = require('../controllers');
const { midtransController } = require('../controllers');

const { authJWT } = require('../middlewares/authJWT');

router.post(
  '/create',
  authJWT,
  transactionController.createTransactionHandler
);

router.post(
  '/create-snap-token',
  // authJWT,
  midtransController.createSnapTransactionHandler
);

module.exports = router;
