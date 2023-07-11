/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     *
     */

    const currentDate = new Date();

    await queryInterface.bulkInsert(
      'Categories',
      [
        {
          name: 'Teknologi',
          createdAt: currentDate,
          updatedAt: currentDate,
        },
        {
          name: 'Masak-masak',
          createdAt: currentDate,
          updatedAt: currentDate,
        },
        {
          name: 'Desain UI/UX',
          createdAt: currentDate,
          updatedAt: currentDate,
        },
        {
          name: 'Otomotif',
          createdAt: currentDate,
          updatedAt: currentDate,
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Categories', null, {});
  },
};
