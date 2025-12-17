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
            Payment.belongsTo(models.User, { // liên kết với User
                foreignKey: 'userId',
                as: 'user'
            });
        }
    }
    Payment.init({
        bookingId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        userId: { // thêm khóa ngoại trỏ về User
            type: DataTypes.INTEGER,
            allowNull: false
        },
        totaladult: DataTypes.INTEGER,
        totalchild: DataTypes.INTEGER,
        totalPrice: DataTypes.FLOAT,
        paymentDate: DataTypes.DATE,
        status: DataTypes.INTEGER,
        paymentMethod: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Payment',
    });
    return Payment;
}; 