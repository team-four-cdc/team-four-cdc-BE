/* eslint-disable no-unused-vars */
/** @type {import('sequelize-cli').Migration} */
const moment = require('moment');

const newDate = moment().add(1, 'days').toString();
const expiryDate = new Date(newDate);

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [{
      id: 1,
      full_name: 'joik',
      email: 'joik@mail.com',
      password: 'f8546c92533575c50696d739fa1f8eecf4ae68832f8ce808ab383ca3c2af26fd',
      role: 'reader',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaWtAbWFpbC5jb20iLCJ1c2VyX2lkIjoxLCJpYXQiOjE2NzcxOTM5ODksImV4cCI6MTY3NzI4MDM4OX0.3lhlaYgwUt0WJdlXr_BTp6zXAtaKb2bWqw9nMNtGMn0',
      photo_url: null,
      is_verified: false,
      salt: '8904b861eec9772afd9845aa5db67a36',
      created_at: new Date(),
      updated_at: new Date()
    }], {});

    const userData = await queryInterface.sequelize.query(
      'SELECT id from users;'
    );

    const userRow = userData[0];
    await queryInterface.bulkInsert('auths', [{
      id: 1,
      user_id: userRow[0].id,
      generate_code: 'ENAKBG7',
      expiry_date: expiryDate,
      purpose: null,
      created_at: new Date(),
      updated_at: new Date()
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('auths', null, {});
  }
};
