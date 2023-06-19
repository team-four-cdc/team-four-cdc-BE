const sequelize = require('sequelize');
class TransactionService {
  constructor({ transactionModel, articleModel, userModel }) {
    this.transactionModel = transactionModel;
    this.articleModel = articleModel;
    this.userModel = userModel;
  }

  async createTransaction({
    accountNumber,
    accountName,
    bankName,
    articleId,
    status,
    userId,
  }) {
    return this.transactionModel.create({
      accountNumber,
      accountName,
      bankName,
      articleId,
      status,
      userId,
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

  async checkOwnedArticle(userId, articleId) {
    return this.transactionModel.findOne(
      { where: { user_id: userId, article_id: articleId } }
    );
  }
}

module.exports = TransactionService;
