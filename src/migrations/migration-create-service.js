'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Service', {

            // serviceId: DataTypes.STRING,
            // priceId: DataTypes.STRING,
            // description: DataTypes.STRING,
            // timetodo: DataTypes.STRING,

            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            serviceId: {
                type: Sequelize.STRING
            },
            priceID: {
                type: Sequelize.STRING
            },
            description: {
                type: Sequelize.STRING
            },
            timetodo: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('Service');
    }
};