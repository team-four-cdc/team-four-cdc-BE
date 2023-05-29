const express = require('express');
const router = express.Router();
const { transactionController } = require('../controllers');
const { authJWT } = require('../middlewares/authJWT');

router.post(
  '/create',
  // authJWT,
  transactionController.createTransactionHandler
);

module.exports = router;
