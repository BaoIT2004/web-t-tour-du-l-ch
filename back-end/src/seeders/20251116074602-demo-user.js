'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'Pham',
        lastName: 'Bao',
        email: 'baophamvanbao9424@gmail.com',
        password: '12345678',
        address: 'Daklak',
        phonenumber: '1234',
        gender: "1",
        roleid: 'R1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
