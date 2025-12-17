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
            userId: {           // sửa từ customerid
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Users',  // tên bảng Users
                    key: 'id'
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            },
            tourId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'tour', // phải đúng tên bảng Tour migration
                    key: 'id'
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
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