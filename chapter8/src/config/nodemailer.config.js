const nodemailer = require('nodemailer');
const OAuth2Client = require('./oauth.config');

OAuth2Client.google.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });

module.exports = {
    sendEmail: async (to, subject, template) => {
        try {
            const accessToken = await OAuth2Client.google.getAccessToken();

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    type: 'OAuth2',
                    user: process.env.GOOGLE_EMAIL,
                    clientId: process.env.GOOGLE_CLIENT_ID,
                    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
                    accessToken: accessToken
                }
            });

            console.info(`Attempting send email to ${to} with subject Chapter 8 - ${subject} . . .`);
            const info = await transporter.sendMail({
                to,
                subject: `Chapter 8 - ${subject}`,
                html: template,
                priority: 'high'
            });
            console.info('Message sent: %s', info.messageId);
        } catch (e) {
            throw e;
        }
    }
};
