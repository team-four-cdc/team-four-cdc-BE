'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Transactions', {
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
      references: { model: 'Articles', key: 'id' },
    },
      status: {
        type: Sequelize.STRING
      },
      user_id: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: { model: 'Users', key: 'id' },
    },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Transactions');
  }
};