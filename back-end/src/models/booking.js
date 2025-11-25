'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Booking extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Booking.init({
        adminid: DataTypes.INTEGER,
        customerid: DataTypes.INTEGER,
        // bổ sung id user , id tour làm khóa phụ
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
    });
    return Booking;
}; 