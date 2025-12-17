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
         id_schedule: {                  // thêm dòng này
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        itinerary: DataTypes.STRING,
        startDate: DataTypes.DATE,
        status: DataTypes.STRING,
        notes: DataTypes.STRING,
        tourId: DataTypes.INTEGER   
    }, {
        sequelize,
        modelName: 'schedule',
         tableName: 'schedules',
        timestamps: true
    });
    return schedule;
}; 