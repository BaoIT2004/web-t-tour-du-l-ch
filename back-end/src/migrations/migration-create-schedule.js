'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('schedules', {
      id_schedule: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tourId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'tour',   // bảng tour
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      itinerary: {
        type: Sequelize.STRING
      }, startDate: {
        type: Sequelize.DATE
      },
       endDate: {
        type: Sequelize.DATE
      },
       status: {
        type: Sequelize.STRING
      },
       notes: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('schedules');
  }
};