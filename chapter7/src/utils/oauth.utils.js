const { google } = require('../config/oauth.config');

module.exports = {
    googleGenerateUrl: () => {
        const scopes = [
            'https://www.googleapis.com/auth/userinfo.email',
            'https://www.googleapis.com/auth/userinfo.profile',
        ];
        return google.generateAuthUrl({
            access_type: 'offline',
            scope: scopes,
            prompt: 'consent',
        });
    },
};
