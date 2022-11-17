'use strict';

module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.addColumn('UserGames', 'provider', {
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue: 'local',
        });
        await queryInterface.addColumn('UserGames', 'provider_id', {
            type: Sequelize.STRING,
            allowNull: true,
        });
        await queryInterface.addColumn('UserGames', 'role', {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: 'user',
        });
        await queryInterface.addColumn('UserGames', 'avatar', {
            type: Sequelize.STRING,
            allowNull: true,
        });
    },

    async down (queryInterface, Sequelize) {
        await queryInterface.removeColumn('UserGames', 'provider');
        await queryInterface.removeColumn('UserGames', 'provider_id');
        await queryInterface.removeColumn('UserGames', 'role');
        await queryInterface.removeColumn('UserGames', 'avatar');
    }
};
