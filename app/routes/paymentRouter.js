const express = require('express');
const router = express.Router();
const { paymentController } = require('../controllers');
const { authJWT } = require('../middlewares/authJWT');

router.post(
  '/create',
  authJWT,
  paymentController.createPaymentHandler
);

module.exports = router;
