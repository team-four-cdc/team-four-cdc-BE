const db = require('../models');

class ArticleService {
  constructor() {
    this.articleModel = db.Article;
    this.userModel = db.User;
  }
  async getListing() {
    return await this.articleModel.findAll({
      include: {
        model: this.userModel,
        attributes: {
          exclude: ['password', 'token', 'is_verified'],
        },
        as: 'author',
      },
      order: [['createdAt', 'DESC']],
    });
  }
}

module.exports = ArticleService;
