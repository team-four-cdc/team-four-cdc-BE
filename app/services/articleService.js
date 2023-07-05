const { Op } = require('sequelize');
class ArticleService {
  constructor({ transactionModel, articleModel, userModel }) {
    this.transactionModel = transactionModel;
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
    return this.articleModel.findAll(query);
  }

  async getUnboughtList({ userId, limit }) {
    const query = {
      include: {
        model: this.transactionModel,
        where: {user_id: {
          [Op.not]: userId
        }},
        as: 'transactions',
        required: true,
        include: {
          model: this.userModel,
          attributes: {
            exclude: ['password', 'token', 'is_verified'],
          },
          as: 'user',
        }
      },
      order: [['createdAt', 'DESC']],
      limit: limit
    };
    return this.articleModel.findAll(query);
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
    return this.articleModel.findAll(query);
  }

  async updateArticle({
    articleId,
    title,
    body,
    description,
    price,
    totalClicks,
  }) {
    return this.articleModel.update(
      {
        title,
        body,
        description,
        price,
        totalClicks,
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

  async checkCreatedArticle(userId, articleId) {
    return this.articleModel.findOne(
      { where: { author_id: userId, id: articleId } }
    );
  }
}

module.exports = ArticleService;
