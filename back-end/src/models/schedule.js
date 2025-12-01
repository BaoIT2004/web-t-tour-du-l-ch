'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class schedule extends Model {
        static associate(models) {
            // Lịch trình thuộc 1 Tour
            schedule.belongsTo(models.Tours, {
                foreignKey: 'tourId',
                as: 'tour'
            });
        }
    }
    schedule.init({
        itinerary: DataTypes.STRING,
        startDate: DataTypes.DATE,
        endDate: DataTypes.DATE,
        status: DataTypes.STRING,
        notes: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'schedule',
    });
    return schedule;
}; 