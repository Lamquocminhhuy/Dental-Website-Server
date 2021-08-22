'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('doctor_infor', {
            // doctorId: DataTypes.INTEGER,
            // priceId: DataTypes.STRING,
            // addressId: DataTypes.STRING,
            // paymentId: DataTypes.STRING,
            // note: DataTypes.STRING,
            // count: DataTypes.INTEGER,
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            doctorId: {
                type: Sequelize.INTEGER
            },
            priceId: {
                type: Sequelize.STRING
            },
            addressId: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            paymentId: {
                type: Sequelize.STRING
            },
            note: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            count: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0

            },
            createdAt: {
                allowNull: true,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: true,
                type: Sequelize.DATE
            }
        });
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('doctor_infor');
    }
};