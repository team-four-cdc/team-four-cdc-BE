const express = require('express');
const router = express.Router();
const { categoryController } = require('../controllers');
const { authJWT } = require('../middlewares/authJWT');

router.get('/listing', authJWT, categoryController.getCategoryListing);

module.exports = router;
