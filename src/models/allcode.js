'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Allcode extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Allcode.hasMany(models.User, { foreignKey: 'positionId', as: 'PositionData' })
            Allcode.hasMany(models.User, { foreignKey: 'gender', as: 'genderData' })
            Allcode.hasMany(models.Schedule, { foreignKey: 'timeType', as: 'timeTypeData' })
            Allcode.hasMany(models.Service, { foreignKey: 'serviceId', as: 'ServiceData' })
            Allcode.hasMany(models.Service, { foreignKey: 'priceId', as: 'PriceData' })
            Allcode.hasMany(models.Doctor_Infor, { foreignKey: 'priceId', as: 'Price' })
            Allcode.hasMany(models.Doctor_Infor, { foreignKey: 'paymentId', as: 'PaymentData' })
            Allcode.hasMany(models.Doctor_Infor, { foreignKey: 'addressId', as: 'AddressData' })
            Allcode.hasMany(models.Booking, { foreignKey: 'timeType', as: 'Time' })
            Allcode.hasMany(models.Booking, { foreignKey: 'statusId', as: 'Status' })
            Allcode.hasMany(models.Booking, { foreignKey: 'serviceId', as: 'Service' })
        }
    };
    Allcode.init({

        keyMap: DataTypes.STRING,
        type: DataTypes.STRING,
        valueEn: DataTypes.STRING,
        valueVi: DataTypes.STRING,


    }, {
        sequelize,
        modelName: 'Allcode',
    });
    return Allcode;
};