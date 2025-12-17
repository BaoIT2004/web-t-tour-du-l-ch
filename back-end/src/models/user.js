  'use strict';
  const {
    Model
  } = require('sequelize');
  module.exports = (sequelize, DataTypes) => {
    class User extends Model {
      static associate(models) {
        // 1 user có nhiều booking
        User.hasMany(models.Booking, {
          foreignKey: 'userId', // khóa ngoại trong Booking trỏ về User
          as: 'bookings'            // alias khi truy xuất
        });
        User.hasMany(models.Review, {
          foreignKey: 'userId', // khóa ngoại trong Booking trỏ về User
          as: 'reviews'            // alias khi truy xuất
        });
        User.hasMany(models.Payment, {
          foreignKey: 'userId', // tạo userId trong bảng Payment
          as: 'payments'
        });
      }
    }
    User.init({
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      address: DataTypes.STRING,
      phonenumber: DataTypes.STRING,
      gender: DataTypes.BOOLEAN,
      roleid: DataTypes.STRING, 
    }, {
      sequelize,
      modelName: 'User',
    });
    return User;
  };