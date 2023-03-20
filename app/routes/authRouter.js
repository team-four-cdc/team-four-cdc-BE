const express = require('express');
const router = express.Router();
const { authController } = require('../controllers');

router.post('/login/:role', authController.verifyAuthHandler);

module.exports = router;
