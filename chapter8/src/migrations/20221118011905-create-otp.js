'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('OTPs', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false
            },
            otp: {
                type: Sequelize.STRING,
                allowNull: false
            },
            expirationTime: {
                type: Sequelize.DATE,
                allowNull: false
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
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('OTPs');
    }
};
