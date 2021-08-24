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
      Booking.belongsTo(models.Allcode, { foreignKey: 'timeType', targetKey: 'keyMap', as: 'Time' })
      Booking.belongsTo(models.Allcode, { foreignKey: 'statusId', targetKey: 'keyMap', as: 'Status' })
      Booking.belongsTo(models.Allcode, { foreignKey: 'serviceId', targetKey: 'keyMap', as: 'Service' })
      Booking.belongsTo(models.User, { foreignKey: 'patientId', targetKey: 'id', as: 'PatientData' })
      Booking.belongsTo(models.User, { foreignKey: 'doctorId', targetKey: 'id', as: 'DoctorData' })
  
    }
  };
  Booking.init({

        
        statusId: DataTypes.STRING,
        doctorId: DataTypes.INTEGER,
        patientId: DataTypes.INTEGER,
        date: DataTypes.STRING,
        serviceId: DataTypes.STRING,
        timeType: DataTypes.STRING,
        


  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};