'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Tours extends Model {
        static associate(models) {
            // 1 Tour có nhiều Lịch trình
            Tours.hasMany(models.schedule, {
                foreignKey: 'tourId',
                as: 'schedules'
            });
            // 1 Tour có nhiều booking
            Tours.hasMany(models.Booking, {
                foreignKey: 'tourId',
                as: 'bookings'
            });
            // 1 Tours có nhiều đánh giá
            Tours.hasMany(models.Review, {
                foreignKey: 'tourId',
                as: 'reviews'
            });
        }
    }
    Tours.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        tourName: DataTypes.STRING,
        tourPrice: DataTypes.FLOAT,
        description: DataTypes.TEXT,
        image: DataTypes.TEXT,
        policy: DataTypes.TEXT,
        included: DataTypes.TEXT,
        excluded: DataTypes.TEXT,
        activeid: DataTypes.BOOLEAN,
    }, {
        sequelize,
        modelName: 'Tours',
        tableName: 'tour',  
    });
    return Tours;
}; 