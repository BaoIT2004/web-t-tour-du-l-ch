'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Tours extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Tours.init({
        adminid: DataTypes.INTEGER,
        customerid: DataTypes.INTEGER,
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
    });
    return Tours;
}; 