const UserGameService = require('../services/usergame.service');
const { response } = require("../utils/response.utils");
const { removeUploadedFile } = require("../helpers/image.helper");

module.exports = {
    register: async (req, res) => {
        try {
            await UserGameService.register(req);
            return response(res, 201, true, "User registered successfully");
        } catch (err) {
            removeUploadedFile(req.file);
            return response(res, 500, false, err.message);
        }
    },
    login: async (req, res) => {
        try {
            const user = await UserGameService.login(req.body);
            return response(res, 200, true, "User logged in successfully", { user });
        } catch (err) {
            return response(res, err?.status || 500, false, err.message);
        }
    },
    me: async (req, res) => {
        try {
            const user = await UserGameService.me(req.user);
            return response(res, 200, true, "User retrieved successfully", { user });
        } catch (err) {
            return response(res, err?.status || 500, false, err.message);
        }
    },
    changePassword: async (req, res) => {
        try {
            await UserGameService.changePassword(req.user, req.body);
            return response(res, 200, true, "Password changed successfully");
        } catch (err) {
            return response(res, err?.status || 500, false, err.message);
        }
    },
    uploadOrUpdateAvatar: async (req, res) => {
        try {
            await UserGameService.uploadOrUpdateAvatar(req);
            return response(res, 200, true, "Avatar uploaded successfully");
        } catch (err) {
            removeUploadedFile(req.file);
            return response(res, err?.status || 500, false, err.message, err.errors);
        }
    },
    googleLogin: async (req, res) => {
        try {
            const oauth_url = await UserGameService.googleLogin();
            return response(res, 200, true, "Google login url retrieved successfully", { oauth_url });
        } catch (err) {
            return response(res, err?.status || 500, false, err.message);
        }
    },
    googleLoginCallback: async (req, res) => {
        try {
            const serviceResponse = await UserGameService.googleLoginCallback(req);
            return response(res, 200, true, "Google login callback retrieved successfully", serviceResponse);
        } catch (err) {
            return response(res, err?.status || 500, false, err.message);
        }
    },
    facebookLogin: async (req, res) => {
        try {
            const oauth_url = await UserGameService.facebookLogin();
            return response(res, 200, true, "Facebook login url retrieved successfully", { oauth_url });
        } catch (err) {
            return response(res, err?.status || 500, false, err.message);
        }
    },
    facebookLoginCallback: async (req, res) => {
        try {
            const serviceResponse = await UserGameService.facebookLoginCallback(req);
            return response(res, 200, true, "Facebook login callback retrieved successfully", serviceResponse);
        } catch (err) {
            return response(res, err?.status || err?.response?.status || 500, false, err?.response?.headers['www-authenticate'] || err.message);
        }
    },
};
