'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      account_number: {
        type: Sequelize.STRING
      },
      account_name: {
        type: Sequelize.STRING
      },
      bank_name: {
        type: Sequelize.STRING
      },
      article_id: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: { model: 'articles', key: 'id' },
    },
      status: {
        type: Sequelize.STRING
      },
      user_id: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: { model: 'users', key: 'id' },
    },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('transactions');
  }
};