'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class PassengerDetail extends Model {
        static associate(models) {
            PassengerDetail.belongsTo(models.Booking, {
                foreignKey: 'bookingId',
                as: 'booking'
            });
        }
    }

    PassengerDetail.init({
        bookingId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        fullName: DataTypes.STRING,      // Họ tên
        birthDate: DataTypes.DATEONLY,   // Ngày sinh
        gender: DataTypes.STRING,        // Giới tính
        idNumber: DataTypes.STRING,      // Số CCCD
        customerType: DataTypes.STRING,  // loại khách
        email: DataTypes.STRING,         // Email
        phoneNumber: DataTypes.STRING,   // SDT
        note: DataTypes.TEXT             // ghi chú
    }, {
        sequelize,
        modelName: 'PassengerDetail',
        tableName: 'PassengerDetails'
    });

    return PassengerDetail;
};
