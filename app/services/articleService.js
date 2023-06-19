const { Op } = require('sequelize');
class ArticleService {
  constructor({ articleModel, userModel }) {
    this.articleModel = articleModel;
    this.userModel = userModel;
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

  async getListing({ userId }) {
    const query = {
      include: {
        model: this.userModel,
        attributes: {
          exclude: ['password', 'token', 'is_verified'],
        },
        as: 'author',
      },
      order: [['createdAt', 'DESC']],
    };

    if (userId) {
      if (Array.isArray(userId)) {
        query.where = {
          author_id: {
            [Op.or]: userId,
          },
        };
      } else {
        query.where = {
          author_id: userId,
        };
      }
    }
    return await this.articleModel.findAll(query);
  }

  async getRandomListing({ userId }) {
    const query = {
      include: {
        model: this.userModel,
        attributes: {
          exclude: ['password', 'token', 'is_verified'],
        },
        as: 'author',
      },
      order: [['createdAt', 'DESC']],
    };

    if (userId) {
      if (Array.isArray(userId)) {
        query.where = {
          author_id: {
            [Op.or]: userId,
            [Op.limit]: 1,
          },
        };
      } else {
        query.where = {
          author_id: userId,
        };
      }
    }
    return await this.articleModel.findAll(query);
  }

  async updateArticle({ articleId, title, body, description, price, total_clicks }) {
    return this.articleModel.update(
      {
        title,
        body,
        description,
        price,
        total_clicks
      },
      { where: { id: articleId } }
    );
  }

  async deleteArticle({ articleId }) {
    return this.articleModel.destroy({
      where: { id: articleId },
    });
  }

  async getDetailArticle(articleId) {
    return this.articleModel.findByPk(articleId);
  }

  async getPopularArticles(limit) {
    return this.articleModel.findAll({
      order: [['total_clicks', 'DESC']],
      limit,
    });
  }

  async getCreatedArticle(userId, articleId) {
    return this.articleModel.findOne(
      { where: { author_id: userId, id: articleId } }
    );
  }

  async getCreatedArticleList(userId, limit, offset) {
    return this.articleModel.findAll({
      where: { author_id: userId },
      order: [['createdAt', 'DESC']],
      limit,
      offset
    });
  }
}

module.exports = ArticleService;
