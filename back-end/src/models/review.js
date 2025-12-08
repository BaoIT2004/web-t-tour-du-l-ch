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
        }
    }

    Review.init({
         tourId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        comment: DataTypes.TEXT,
        reviewDate: DataTypes.DATEONLY
    }, {
        sequelize,
        modelName: 'Review',
        tableName: 'Reviews'
    });

    return Review;
};
