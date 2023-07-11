const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
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
  }
  Auth.init(
    {
      user_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: 'Users', key: 'id' },
      },
      generate_code: {
        type: DataTypes.STRING,
      },
      expiry_date: {
        type: DataTypes.DATE,
      },
      purpose: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'Auth',
    }
  );
  return Auth;
};
