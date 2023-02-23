const {
  Model
} = require('sequelize');
const appRoot = require('app-root-path');

const logger = require(`${appRoot}/config/loggerConfig`);
const { loggerConstant } = require(`${appRoot}/app/constants`);
module.exports = (sequelize, DataTypes) => {
  const MODEL_NAME = 'Auth';
  class Auth extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: 'user_id' });
    }

    static async findOneByGenerateCode(value) {
      logger.debug(`${loggerConstant.FIND_QUERY} from DB ${MODEL_NAME} [value: ${JSON.stringify(value)}]`);

      return this.findOne({ where: { generate_code: value } }).then(async (authData) => {
        if (authData) {
          logger.debug(`Success when ${loggerConstant.FIND_QUERY} from DB ${MODEL_NAME} [value: ${JSON.stringify(value)}]`);

          return authData;
        }

        return null;
      }).catch((error) => {
        logger.error(`Error ${loggerConstant.FIND_QUERY} from DB ${MODEL_NAME} [error: ${JSON.stringify(error)}]`);
        return null;
      });
    }
  }
  Auth.init({
    user_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: 'users', key: 'id' },
    },
    generate_code: {
      type: DataTypes.STRING
    },
    expiry_date: {
      type: DataTypes.DATE
    },
    purpose: {
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'Auth',

    // don't use camelcase for automatically added attributes but underscore style
    // so updatedAt will be updated_at
    underscored: true,

    // disable the modification of tablenames; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
    freezeTableName: true,

    // define the table's name
    tableName: 'auths'
  });
  return Auth;
};
