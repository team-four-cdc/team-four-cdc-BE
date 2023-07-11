const sequelize = require('sequelize');
class TransactionService {
  constructor({ transactionModel, articleModel, userModel }) {
    this.transactionModel = transactionModel;
    this.articleModel = articleModel;
    this.userModel = userModel;
  }

  async createTransaction({
    /* eslint-disable camelcase */
    account_number,
    /* eslint-disable camelcase */
    account_name,
    /* eslint-disable camelcase */
    bank_name,
    /* eslint-disable camelcase */
    article_id,
    status,
    /* eslint-disable camelcase */
    user_id,
  }) {
    return this.transactionModel.create({
      /* eslint-disable camelcase */
      account_number,
      /* eslint-disable camelcase */
      account_name,
      /* eslint-disable camelcase */
      bank_name,
      /* eslint-disable camelcase */
      article_id,
      /* eslint-disable camelcase */
      status,
      /* eslint-disable camelcase */
      user_id,
    });
  }

  async getDashboardTransaction({ articleIds }) {
    const query = {
      include: {
        model: this.articleModel,
        attributes: {},
        as: 'Article',
      },
      attributes: [
        'Article.id',
        [sequelize.fn('COUNT', sequelize.col('Article.id')), 'sales'],
        [sequelize.fn('SUM', sequelize.col('Article.price')), 'value'],
      ],
      group: ['Article.id'],
    };
    query.where = {
      article_id: articleIds,
    };
    return this.transactionModel.findAll(query);
  }

  async getlistOwnedArticle({
    userId
  }) {
    const query = {
      include: {
        model: this.articleModel,
        attributes: {},
        as: 'Article',
      },
      order: [['createdAt', 'DESC']],
    };
    query.where = {
      user_id: userId
    };
    return this.transactionModel.findAll(query);
  }

  async getOwnedArticle(userId, articleId) {
    return this.transactionModel.findOne(
      { where: { user_id: userId, article_id: articleId } },
    );
  }

  async getOwnedArticleList(userId, limit, offset) {
    return this.transactionModel.findAll(
      {
        where: { user_id: userId },
        order: [['createdAt', 'DESC']],
        limit,
        offset
      }
    );
  }
}

module.exports = TransactionService;
