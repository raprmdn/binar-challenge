const express = require('express');
const UserGameController = require('../controllers/usergame.controller');
const {
    loginValidation,
    registerValidation,
    changePasswordValidation
} = require("../utils/validation/usergame.validation");
const {authentication} = require("../middlewares/authentication.middleware");
const { response } = require("../utils/response.utils");

const router = express.Router();

router.post('/login', loginValidation, UserGameController.login);
router.post('/register', registerValidation, UserGameController.register);
router.get('/me', authentication, UserGameController.me);
router.patch('/change-password', authentication, changePasswordValidation, UserGameController.changePassword);
router.post('/logout', authentication, (req, res) => {
    return response(res, 200, true, "Logged out successfully");
});

router.get('/google', UserGameController.googleLogin);
router.get('/google/callback', UserGameController.googleLoginCallback);
router.get('/facebook', UserGameController.facebookLogin);
router.get('/facebook/callback', UserGameController.facebookLoginCallback);

module.exports = router;
