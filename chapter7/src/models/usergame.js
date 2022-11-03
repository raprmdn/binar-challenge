'use strict';
const {
    Model
} = require('sequelize');
const { getAvatarUserUrl } = require('../helpers/image.helper');
const fs = require('fs');

module.exports = (sequelize, DataTypes) => {
    class UserGame extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            UserGame.hasMany(models.UserGameBiodata, {
                foreignKey: 'userId',
                as: {
                    singular: 'biodata',
                    plural: 'biodata'
                },
                onDelete: 'NO ACTION',
                onUpdate: 'NO ACTION'
            });

            UserGame.hasMany(models.UserGameHistory, {
                foreignKey: 'userId',
                as: {
                    singular: 'history',
                    plural: 'histories'
                },
                onDelete: 'NO ACTION',
                onUpdate: 'NO ACTION',
                hooks: true
            });
        }
    }

    UserGame.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        provider: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'local',
        },
        provider_id: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'user',
        },
        avatar: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    }, {
        sequelize,
        modelName: 'UserGame',
        getterMethods: {
            avatarUrl() {
                const localAvatar = this.avatar && fs.existsSync(`./storage/images/users/${this.avatar}`);
                if (this.provider !== 'local' && !localAvatar)
                    return this.avatar;

                return this.avatar ? getAvatarUserUrl(this.avatar) : null;
            }
        }
    });
    return UserGame;
};
