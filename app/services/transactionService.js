const { Op } = require('sequelize');
const sequelize = require('sequelize');
class TransactionService {
  constructor({ transactionModel, articleModel, userModel }) {
    this.transactionModel = transactionModel;
    this.articleModel = articleModel;
    this.userModel = userModel;
  }

  async createTransaction({
    account_number,
    account_name,
    bank_name,
    article_id,
    status,
    user_id
  }) {
    return this.transactionModel.create({
      account_number,
      account_name,
      bank_name,
      article_id,
      status,
      user_id
    });
  }

  async getDashboardTransaction({
    articleIds
  }) {
    const query = {
      include: {
        model: this.articleModel,
        attributes: {},
        as: 'Article',
      },
      attributes:[
        'Article.id',
        [sequelize.fn("COUNT", sequelize.col("Article.id")), "sales"],
        [sequelize.fn("SUM", sequelize.col("Article.price")), "value"],
      ],
      group:['Article.id'],
      
    };
    query.where = {
      article_id: articleIds
    };
    return await this.transactionModel.findAll(query);
  }
}

module.exports = TransactionService;
