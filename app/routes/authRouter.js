const express = require('express');
const router = express.Router();
const { authController } = require('../controllers');

router.post('/login/:role', authController.verifyAuthHandler);
router.post('/send-email/:role', authController.forgotPasswordWithEmailHandler);
router.post('/reset-password', authController.updatePasswordHandler);

module.exports = router;
