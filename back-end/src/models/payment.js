'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Payment extends Model {

        static associate(models) {
            // Mỗi payment thuộc về 1 booking
            Payment.belongsTo(models.Booking, {
                foreignKey: 'bookingId',
                as: 'booking'
            });
        }
    }
    Payment.init({
        bookingId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        totalPrice: DataTypes.FLOAT,
        paymentDate: DataTypes.DATE,
        statusid: DataTypes.INTEGER,
        paymentMethod: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Payment',
    });
    return Payment;
}; 