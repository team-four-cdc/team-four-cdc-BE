const express = require('express');
const router = express.Router();
const { userController } = require('../controllers');

router.post('/register', userController.createUserController);
router.post('/verify', userController.verifyUserController);

module.exports = router;
