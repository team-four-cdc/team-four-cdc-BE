const db = require('../models');

class ArticleReaderService {
  constructor() {
    this.articleReaderModel = db.ArticleReader;
  }

  async checkOwnedArticle(userId, articleId) {
    return this.articleReaderModel.findOne(
      { where: { user_id: userId, article_id: articleId } }
    );
  }
}

module.exports = ArticleReaderService;
