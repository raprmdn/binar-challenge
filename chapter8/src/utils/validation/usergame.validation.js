const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');
const { responseValidationError } = require('../response.utils');
const existsJoiValidation = require('../../helpers/existsJoiValidation.helper');
const { removeUploadedFile } = require('../../helpers/image.helper');

const options = {
    errors: {
        wrap: {
            label: ''
        }
    },
    abortEarly: false
};

module.exports = {
    registerValidation: async (req, res, next) => {
        const schema = Joi.object({
            name: Joi.string().max(255).required().label("Name"),
            username: Joi.string().max(25).regex(/^[a-zA-Z0-9-_]+$/).required().label("Username")
                .external(async (value) => {
                    return await existsJoiValidation.isUsernameExists(value);
                })
                .options({ messages: { 'string.pattern.base': 'Username must only contains alphanumeric, dash, and underscore' } }),
            email: Joi.string().email().required().label("Email")
                .external(async (value) => {
                    return await existsJoiValidation.isEmailExists(value);
                }),
            password: passwordComplexity().required().label("Password"),
            password_confirmation: Joi.string().required().valid(Joi.ref('password'))
                .label("Password Confirmation")
                .options({messages: {'any.only': '{{#label}} does not match'}}),
            avatar: Joi.any(),
        });

        try {
            await schema.validateAsync(req.body, options);
            next();
        } catch (err) {
            removeUploadedFile(req.file);
            return responseValidationError(res, err);
        }
    },
    loginValidation: (req, res, next) => {
        const schema = Joi.object({
            email: Joi.string().email().required().label("Email"),
            password: Joi.string().required().label("Password"),
        });

        const {error} = schema.validate(req.body, options);
        if (error) return responseValidationError(res, error);

        next();
    },
    changePasswordValidation: (req, res, next) => {
        const schema = Joi.object({
            current_password: Joi.string().required().label("Current Password"),
            new_password: passwordComplexity().required().label("New Password"),
            password_confirmation: Joi.string().required().valid(Joi.ref('new_password'))
                .label("Password Confirmation")
                .options({messages: {'any.only': '{{#label}} does not match'}})
        });

        const {error} = schema.validate(req.body, options);
        if (error) return responseValidationError(res, error);

        next();
    }
};
