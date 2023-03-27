const { Model } = require('sequelize');
const { hash } = require('../utils/hashPassword');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.Auth, { foreignKey: 'user_id' });
      this.hasMany(models.Article, { foreignKey: 'author_id' });
      this.hasMany(models.ArticleReader, { foreignKey: 'user_id' });
      this.hasMany(models.Transaction, { foreignKey: 'user_id' });
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      full_name: {
        type: DataTypes.STRING,
      },
      role: {
        type: DataTypes.STRING,
      },
      author: {
        type: DataTypes.STRING,
      },
      token: {
        type: DataTypes.STRING,
      },
      photo_url: {
        type: DataTypes.STRING,
      },
      is_verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'Users',
    }
  );

  User.beforeCreate(async (user) => {
    const hashedPassword = await hash(user.password);
    user.password = hashedPassword;
  });

  User.beforeUpdate(async (user) => {
    const hashedPassword = await hash(user.password);
    user.password = hashedPassword;
  });

  return User;
};
