'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Reviews', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            tourId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            comment: {
                type: Sequelize.TEXT
            },
            reviewDate: {
                type: Sequelize.DATEONLY,
                allowNull: false,
                defaultValue: Sequelize.NOW
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
        await queryInterface.dropTable('Reviews');
    }
};
