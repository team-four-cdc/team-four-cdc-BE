const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ArticleReader extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: 'user_id' });
      this.belongsTo(models.Article, { foreignKey: 'article_id' });
      this.belongsTo(models.Transaction, { foreignKey: 'transaction_id' });
    }
  }
  ArticleReader.init({
    user_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: 'Users', key: 'id' },
    },
    article_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: 'Articles', key: 'id' },
    },
    transaction_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: 'Transactions', key: 'id' },
    },
  }, {
    sequelize,
    modelName: 'ArticleReader',
  });
  return ArticleReader;
};
