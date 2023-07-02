const express = require('express');
const router = express.Router();
const { articleController } = require('../controllers');
const { authJWT } = require('../middlewares/authJWT');
const { uploadCover } = require('../middlewares/upload');

router.get('/listing', articleController.getArticleListing);
router.get('/random-listing', articleController.getRandomArticleByAuthor);
router.get('/dashboard', articleController.getDashboard);
router.get('/popular-article', articleController.getPopularArticles);
router.get('/owned-article', articleController.getListOwnedArticle);

router.get('/:articleId', authJWT, articleController.getDetailArticle);

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
