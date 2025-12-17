'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Booking extends Model {
        static associate(models) {
            // Mỗi booking thuộc về 1 user
            Booking.belongsTo(models.User, {
                foreignKey: 'userId', // trùng với khóa ngoại trong Booking
                as: 'user'
            });
            // Mỗi booking thuộc về 1 tour
            Booking.belongsTo(models.Tours, {
                foreignKey: 'tourId', // trùng với khóa ngoại trong Booking
                as: 'tour'
            });
          
            // 1 booking có nhiều payment
            Booking.hasMany(models.Payment, {
                foreignKey: 'bookingId',
                as: 'payments'
            });
        }
    }
    Booking.init({
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        tourId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        bookingDate: DataTypes.DATE,
        totalAdults: DataTypes.INTEGER,
        totalChildren: DataTypes.INTEGER,
        notes: DataTypes.STRING,
        acceptTerms: DataTypes.BOOLEAN,
        totalPrice: DataTypes.FLOAT,
        statusid: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Booking',
        tableName: 'booking'
    });
    return Booking;
}; 