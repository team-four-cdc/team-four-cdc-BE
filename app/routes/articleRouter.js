const express = require('express');
const router = express.Router();
const { articleController } = require('../controllers');
const { authJWT } = require('../middlewares/authJWT');
const { uploadCover } = require('../middlewares/upload');

router.get('/listing', articleController.getArticleListing);

router.post(
  '/create',
  authJWT,
  uploadCover,
  articleController.createArticleHandler
);

router.put(
  '/:articleId',
  authJWT,
  uploadCover,
  articleController.updateArticleHandler
);

router.delete('/:articleId', authJWT, articleController.deleteArticleHandler);

module.exports = router;
