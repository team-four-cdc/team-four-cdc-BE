const {
  Model
} = require('sequelize');
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

    static async insertNew(data) {
      // const result = await this.create(data, { returning: true });

      return this.create(data, { returning: true }).then(async (user) => {
        if (user) {
          // info
          return user;
        }

        return null;
        // should be provide logger and pass error within catch callback
      }).catch(() => null);
    }

    static async findOneByEmail(value) {
      const result = await this.findOne({ where: { email: value } });

      if (result) {
        return result;
      }

      return null;
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
    full_name: {
      type: DataTypes.STRING
    },
    role: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    },
    author: {
      type: DataTypes.STRING
    },
    token: {
      type: DataTypes.STRING
    },
    photo_url: {
      type: DataTypes.STRING
    },
    is_verified: {
      type: DataTypes.BOOLEAN
    },
    salt: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'User',

    // don't use camelcase for automatically added attributes but underscore style
    // so updatedAt will be updated_at
    underscored: true,

    // disable the modification of tablenames; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
    freezeTableName: true,

    // define the table's name
    tableName: 'users'
  });
  return User;
};
