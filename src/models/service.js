'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Service extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
         
            Service.belongsTo(models.Allcode, { foreignKey: 'serviceId', targetKey: 'keyMap', as: 'ServiceData' })
            Service.belongsTo(models.Allcode, { foreignKey: 'priceId', targetKey: 'keyMap', as: 'PriceData' })

        }
    };
    Service.init({

        serviceId: DataTypes.STRING,
        priceId: DataTypes.STRING,
        description: DataTypes.STRING,
        timetodo: DataTypes.STRING,



    }, {
        sequelize,
        modelName: 'Service',
    });
    return Service;
};