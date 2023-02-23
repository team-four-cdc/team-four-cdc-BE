const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: 'author_id' });
      this.belongsTo(models.Category, { foreignKey: 'category_id' });
      this.hasMany(models.ArticleReader, { foreignKey: 'article_id' });
      this.hasMany(models.Transaction, { foreignKey: 'article_id' });
    }
  }
  Article.init({
    title: {
      type: DataTypes.STRING
    },
    body: {
      type: DataTypes.STRING
    },
    publish_date: {
      type: DataTypes.DATE
    },
    user_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: 'users', key: 'id' },
    },
    photo_article: {
      type: DataTypes.STRING
    },
    price: {
      type: DataTypes.INTEGER
    },
    pdf_url: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    category_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: 'categories', key: 'id' },
    },
  }, {
    sequelize,
    modelName: 'Article',

    // don't use camelcase for automatically added attributes but underscore style
    // so updatedAt will be updated_at
    underscored: true,

    // disable the modification of tablenames; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
    freezeTableName: true,

    // define the table's name
    tableName: 'articles'
  });
  return Article;
};
