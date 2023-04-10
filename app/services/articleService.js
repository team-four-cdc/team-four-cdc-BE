const db = require('../models');

class ArticleService {
  constructor({ articleModel }) {
    this.articleModel = articleModel;
  }

  async createArticle({
    title,
    body,
    publishDate,
    authorId,
    photoArticle,
    price,
    categoryId,
  }) {
    return this.articleModel.create({
      title,
      body,
      publish_date: publishDate,
      author_id: authorId,
      photo_article: photoArticle,
      price,
      category_id: categoryId,
    });
  }
}

module.exports = ArticleService;
