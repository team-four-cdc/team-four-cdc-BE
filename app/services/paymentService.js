const { Op } = require('sequelize');
class PaymentService {
  constructor({ paymentModel, articleModel, userModel }) {
    this.paymentModel = paymentModel;
    this.articleModel = articleModel;
    this.userModel = userModel;
  }

  async createPayment({
    userId,
    articleId,
    amountPaid,
  }) {
    return this.articleModel.create({
      user_id: userId,
      articleId: articleId,
      amount_paid: amountPaid,
    });
  }
}

module.exports = PaymentService;
