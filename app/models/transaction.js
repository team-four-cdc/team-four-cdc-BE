const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {as: 'user', foreignKey: 'user_id' });
      this.belongsTo(models.Article, { foreignKey: 'article_id' });
      this.hasMany(models.ArticleReader, { foreignKey: 'transaction_id' });
    }
  }
  Transaction.init(
    {
      account_number: {
        type: DataTypes.STRING,
      },
      account_name: {
        type: DataTypes.STRING,
      },
      bank_name: {
        type: DataTypes.STRING,
      },
      article_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: 'Articles', key: 'id' },
      },
      status: {
        type: DataTypes.STRING,
      },
      user_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: 'Users', key: 'id' },
      },
    },
    {
      sequelize,
      modelName: 'Transaction',
    }
  );
  return Transaction;
};
