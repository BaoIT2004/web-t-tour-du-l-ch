'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Review extends Model {
        static associate(models) {
        }
    }

    Review.init({
        comment: DataTypes.TEXT,
        reviewDate: DataTypes.DATEONLY
    }, {
        sequelize,
        modelName: 'Review',
        tableName: 'Reviews'
    });

    return Review;
};
