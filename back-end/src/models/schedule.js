'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class schedule extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    schedule.init({
        itinerary: DataTypes.STRING,
        startDate: DataTypes.DATE,
        endDate: DataTypes.DATE,
        status: DataTypes.STRING,
        notes: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'schedule',
    });
    return schedule;
}; 