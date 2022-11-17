const ejs = require("ejs");
const path = require("path");
const { sendEmail } = require("../config/nodemailer.config");

module.exports = {
    registerWelcomeEmailNotification: async (user) => {
        const registerWelcomeEJS = await ejs.renderFile(path.join(__dirname, '../templates/regis-welcome.ejs'), { user });
        sendEmail(user.email, 'Registration Welcome', registerWelcomeEJS)
            .then(() => console.info(`Successfully sent welcome email to ${user.email}`));
    },
}
