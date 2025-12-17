'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Review extends Model {
        static associate(models) {
            // Mỗi đánh thuộc về 1 tour
            Review.belongsTo(models.Tours, {
                foreignKey: 'tourId',
                as: 'tour'
            });
             Review.belongsTo(models.User, {
                foreignKey: 'userId',
                as: 'user'
            });
        }
    }

    Review.init({
         tourId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
         userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        comment: DataTypes.TEXT,
        reviewDate: DataTypes.DATE
    }, {
        sequelize,
        modelName: 'Review',
        tableName: 'Reviews'
    });

    return Review;
};
