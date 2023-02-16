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
      references: { model: 'users', key: 'id' },
    },
    article_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: 'articles', key: 'id' },
    },
    transaction_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: 'transactions', key: 'id' },
    },
  }, {
    sequelize,
    modelName: 'ArticleReader',

    // don't use camelcase for automatically added attributes but underscore style
    // so updatedAt will be updated_at
    underscored: true,

    // disable the modification of tablenames; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
    freezeTableName: true,

    // define the table's name
    tableName: 'article_readers'
  });
  return ArticleReader;
};
