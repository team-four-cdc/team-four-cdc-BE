const express = require('express');
const router = express.Router();
const { articleController } = require('../controllers');

router.get('/listing', articleController.getArticleListing);

module.exports = router;
