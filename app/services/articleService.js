const { Op } = require('sequelize');
const { sequelize, Sequelize } = require('../models');
class ArticleService {
  constructor({ articleModel, userModel, categoryModel }) {
    this.articleModel = articleModel;
    this.userModel = userModel;
    this.categoryModel = categoryModel;
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

  async getRandomListingByAuthorId({ authorId }) {
    const query = {
      include: [{
        model: this.userModel,
        attributes: {
          exclude: ['password', 'token', 'is_verified'],
        },
        as: 'author',
      }, {
        model: this.categoryModel,
        as: 'category'
      }],
      attributes: [
        'id',
        'title',
        [Sequelize.fn('CONCAT', Sequelize.fn('LEFT', Sequelize.col('body'), 50), '...'), 'body'],
        'updatedAt'
      ],
      where: {
        author_id: authorId
      },
      order: sequelize.random(),
      limit: 5,
    };

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
    return this.articleModel.findOne({
      include: [{
        model: this.userModel,
        attributes: {
          exclude: ['password', 'token', 'is_verified'],
        },
        as: 'author',
      }, {
        model: this.categoryModel,
        as: 'category'
      }],
      where: {
        id: articleId
      }
    });
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
