const { google } = require('../config/oauth.config');
const axios = require("axios");

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
    facebookGenerateUrl: () => {
        const requestFacebook = `https://www.facebook.com/v15.0/dialog/
                oauth?client_id=${process.env.FACEBOOK_CLIENT_ID}
                &redirect_uri=${process.env.FACEBOOK_REDIRECT_URI}
                &scope=email,user_friends
                &response_type=code
                &auth_type=rerequest
                &display=popup`;

        return requestFacebook.replace(/\s/g, '');
    },
    facebookGetOAuthAccessToken: async (code) => {
       return await axios.get(`https://graph.facebook.com/v15.0/oauth/access_token?client_id=${process.env.FACEBOOK_CLIENT_ID}&redirect_uri=${process.env.FACEBOOK_REDIRECT_URI}&client_secret=${process.env.FACEBOOK_CLIENT_SECRET}&code=${code}`);
    },
    facebookGetOAuthProfile: async (access_token) => {
        return await axios.get(`https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${access_token}`);
    }
};
