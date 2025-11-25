'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Booking', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            adminid: {
                type: Sequelize.INTEGER
            },
            customerid: {
                type: Sequelize.INTEGER
            },
            bookingDate: {
                type: Sequelize.DATE
            },
            totalAdults: {
                type: Sequelize.INTEGER
            },
            totalChildren: {
                type: Sequelize.INTEGER
            },
            notes: {
                type: Sequelize.STRING
            },
            acceptTerms: {
                type: Sequelize.BOOLEAN
            },
            totalPrice: {
                type: Sequelize.FLOAT
            },
            statusid: {
                type: Sequelize.INTEGER
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
        await queryInterface.dropTable('Booking');
    }
};