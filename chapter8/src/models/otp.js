'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class OTP extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    OTP.init({
        email: DataTypes.STRING,
        otp: DataTypes.STRING,
        expirationTime: {
            type: DataTypes.DATE,
            set(value) {
                const date = new Date();
                /**
                 * @params value in minutes
                 */
                this.setDataValue('expirationTime', new Date(date.getTime() + value * 60000));
            }
        }
    }, {
        sequelize,
        modelName: 'OTP',
    });
    return OTP;
};
