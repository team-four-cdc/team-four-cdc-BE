'use strict';
const { Model } = require('sequelize');
const moment = require('moment');
module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: 'user_id' });
    }
  }
  Token.init(
    {
      user_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: 'Users', key: 'id' },
      },
      generate_token: DataTypes.STRING,
      expire_in: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Token',
    }
  );

  Token.beforeCreate((token) => {
    const formatDate = moment
      .unix(token.expire_in)
      .format('YYYY-MM-DD HH:mm:ss');
    token.expire_in = formatDate;
  });

  Token.beforeUpdate((token) => {
    const formatDate = moment
      .unix(token.expire_in)
      .format('YYYY-MM-DD HH:mm:ss');
    token.expire_in = formatDate;
  });

  return Token;
};
