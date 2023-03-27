const express = require('express');
const router = express.Router();
const { authController } = require('../controllers');

router.post('/login/:role', authController.verifyAuthHandler);
router.post('/send-email/:role', authController.forgotPasswordWithEmailHandler);
router.put('/reset-password', authController.updatePasswordHandler);
router.post('/refresh-token/:role', authController.refreshTokenHandler);

module.exports = router;
