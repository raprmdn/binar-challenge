const { UserGame } = require('../models');
const bcrypt = require("bcrypt");
const fs = require("fs");
const { generateToken } = require("../utils/jwt.utils");
const {
    googleGenerateUrl,
    facebookGenerateUrl,
    facebookGetOAuthAccessToken,
    facebookGetOAuthProfile
} = require('../utils/oauth.utils');
const { google } = require('../config/oauth.config');
const { generateOAuthUsername, generateOAuthPassword } = require('../helpers/oauth.helper');
const { registerWelcomeEmailNotification } = require("../helpers/mail.helper");

module.exports = {
    register: async (req) => {
        const { name, username, email, password } = req.body;
        const avatar = req.file?.filename;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await UserGame.create({ name, username, email, password: hashedPassword, avatar });

        if (user) await registerWelcomeEmailNotification(user);

        return user;
    },
    login: async (attr) => {
        const { email, password } = attr;

        const user = await UserGame.findOne({ where: { email: email } });
        if (!user) throw { status: 404, message: "These credentials do not match our records" };

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw { status: 404, message: "These credentials do not match our records" };

        const token = generateToken(user);

        return {
            id: user.id, name: user.name, username: user.username,
            email: user.email, provider: user.provider, avatar: user.avatarUrl,
            role: user.role, token
        };
    },
    me: async (user) => {
        const auth = await UserGame.findByPk(user.id);
        if (!auth) throw { status: 404, message: "User not found" };

        return {
            id: auth.id, name: auth.name, username: auth.username,
            email: auth.email, provider: auth.provider, avatar: auth.avatarUrl,
            role: auth.role
        };
    },
    changePassword: async (user, attr) => {
        const auth = await UserGame.findByPk(user.id);
        if (!auth) throw { status: 404, message: "User not found" };

        const { current_password, new_password } = attr;
        const isMatch = await bcrypt.compare(current_password, auth.password);
        if (!isMatch) throw { status: 422, message: "Wrong current password" };

        const hashedPassword = await bcrypt.hash(new_password, 10);
        return await auth.update({ password: hashedPassword });
    },
    uploadOrUpdateAvatar: async (req) => {
        const { id } = req.user;
        const avatar = req.file?.filename;

        const user = await UserGame.findByPk(id);
        if (!user) throw { status: 404, success: false, message: "User not found" };

        const localAvatar = user.avatar && fs.existsSync(`./storage/images/users/${user.avatar}`);
        if (localAvatar) fs.unlinkSync(`./storage/images/users/${user.avatar}`);

        return await user.update({ avatar });
    },
    googleLogin: async () => {
        return googleGenerateUrl();
    },
    googleLoginCallback: async (req) => {
        const { code } = req.query;
        if (!code) throw { status: 400, success: false, message: 'Failed authenticated google account' }

        const { tokens } = await google.getToken(code);
        google.setCredentials(tokens);

        const ticket = await google.verifyIdToken({
            idToken: tokens.id_token,
            audience: process.env.GOOGLE_CLIENT_ID
        });
        const payload = ticket.getPayload();

        const user = await UserGame.findOne({ where: { email: payload.email } });
        if (!user) {
            const username = generateOAuthUsername(payload.name);
            const password = await generateOAuthPassword(payload.email);

            const newUser = await UserGame.create({
                name: payload.name,
                username,
                email: payload.email,
                password,
                provider: 'google',
                provider_id: payload.sub,
                avatar: payload.picture,
            });

            const token = generateToken(newUser);
            newUser.password = undefined;

            if (newUser) await registerWelcomeEmailNotification(newUser);

            return { user: newUser, token, oauth2_details: payload };
        }

        if (user.provider !== 'google') {
            throw {
                status: 409,
                success: false,
                message: 'Failed to authenticated user, the email has already related to another account'
            };
        }

        const token = generateToken(user);
        user.password = undefined;

        return { user, token, oauth2_details: payload };
    },
    facebookLogin: () => {
        return facebookGenerateUrl();
    },
    facebookLoginCallback: async (req) => {
        const { code } = req.query;
        if (!code) throw { status: 400, success: false, message: 'Failed authenticated facebook account' }

        const { data } = await facebookGetOAuthAccessToken(code);
        const response = await facebookGetOAuthProfile(data.access_token);

        const user = await UserGame.findOne({ where: { email: response.data.email } });
        if (!user) {
           const username = generateOAuthUsername(response.data.name);
           const password = await generateOAuthPassword(response.data.email);

           const newUser = await UserGame.create({
               name: response.data.name,
               username,
               email: response.data.email,
               password,
               provider: 'facebook',
               provider_id: response.data.id,
               avatar: response.data.picture.data.url,
           });

            const token = generateToken(newUser);
            newUser.password = undefined;

            if (newUser) await registerWelcomeEmailNotification(newUser);

            return { user: newUser, token, oauth2_details: response.data };
        }

        if (user.provider !== 'facebook') {
            throw {
                status: 409,
                success: false,
                message: 'Failed to authenticated user, the email has already related to another account'
            };
        }

        const token = generateToken(user);
        user.password = undefined;

        return { user, token, oauth2_details: response.data };
    },
};
