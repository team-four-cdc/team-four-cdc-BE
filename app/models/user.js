const {
  Model
} = require('sequelize');
const appRoot = require('app-root-path');

const logger = require(`${appRoot}/config/loggerConfig`);
const { loggerConstant } = require(`${appRoot}/app/constants`);

module.exports = (sequelize, DataTypes) => {
  const MODEL_NAME = 'User';
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

    static async findOneByQuery(query) {
      logger.debug(`${loggerConstant.FIND_QUERY} from DB ${MODEL_NAME} query: ${JSON.stringify(query)}`);
      return this.findOne({ where: query }).then(async (userData) => {
        if (userData) {
          logger.debug(`Success when ${loggerConstant.FIND_QUERY} from DB ${MODEL_NAME} [query: ${JSON.stringify(query)}]`);

          return userData;
        }

        logger.debug(`${loggerConstant.FIND_QUERY} empty data from DB ${MODEL_NAME} [query: ${JSON.stringify(query)}]`);
        return null;
      }).catch((error) => {
        logger.error(`Error ${loggerConstant.FIND_QUERY} from DB ${MODEL_NAME} error: ${JSON.stringify(error)}`);
        return null;
      });
    }

    static async insertNew(data) {
      logger.debug(`${loggerConstant.CREATE_QUERY} data to DB ${MODEL_NAME} [data: ${JSON.stringify(data)}]`);

      return this.create(data, { returning: true }).then(async (user) => {
        if (user) {
          logger.debug(`Success ${loggerConstant.CREATE_QUERY} data to DB ${MODEL_NAME} [data: ${JSON.stringify(data)}]`);

          return user;
        }

        return null;
      }).catch((error) => {
        logger.error(`Error ${loggerConstant.CREATE_QUERY} data to DB ${MODEL_NAME} [error: ${JSON.stringify(error)}]`);
        return null;
      });
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
