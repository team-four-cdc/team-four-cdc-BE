const express = require('express');
const router = express.Router();
const { articleController } = require('../controllers');
const { authJWT } = require('../middlewares/authJWT');
const { uploadCover } = require('../middlewares/upload');

router.post(
  '/:userId/article',
  authJWT,
  uploadCover,
  articleController.createArticleHandler
);

module.exports = router;
