const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { as: 'author', foreignKey: 'author_id' });
      this.belongsTo(models.Category, { foreignKey: 'category_id' });
      this.hasMany(models.ArticleReader, { foreignKey: 'article_id' });
      this.hasMany(models.Transaction, { foreignKey: 'article_id' });
    }
  }
  Article.init(
    {
      title: {
        type: DataTypes.STRING,
      },
      body: {
        type: DataTypes.STRING,
      },
      publish_date: {
        type: DataTypes.DATE,
      },
      author_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: 'Users', key: 'id' },
      },
      photo_article: {
        type: DataTypes.STRING,
      },
      price: {
        type: DataTypes.INTEGER,
      },
      pdf_url: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
      },
      category_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: 'Categories', key: 'id' },
      },
      total_clicks: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: 'Article',
    }
  );
  return Article;
};
