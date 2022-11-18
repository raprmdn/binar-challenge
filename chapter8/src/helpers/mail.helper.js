const ejs = require("ejs");
const path = require("path");
const { sendEmail } = require("../config/nodemailer.config");

module.exports = {
    registerWelcomeEmailNotification: async (user) => {
        const registerWelcomeEJS = await ejs.renderFile(path.join(__dirname, '../templates/regis-welcome.ejs'), { user });
        sendEmail(user.email, 'Registration Welcome', registerWelcomeEJS)
            .then(() => console.info(`Successfully sent welcome email to ${user.email}`));
    },
    orderInvoiceEmailNotification: async (user) => {
        const randomNumberInvoice = Math.floor(100000000000000 + Math.random() * 900000000000000);
        const paymentChannel = ['BCA', 'BNI', 'BRI', 'Permata', 'Mandiri'];
        const randomPaymentChanel = paymentChannel[Math.floor(Math.random() * paymentChannel.length)];
        const randomVirtualAccountNumber = Math.floor(1000000000 + Math.random() * 9000000000);
        const date = new Date();
        const paidAt = date.getDate() + ' ' + (date.getMonth() + 1) + ' ' + date.getFullYear() + ' | ' + date.getHours() + ':' + date.getMinutes();

        const data = {
            user: {
                username: user.username,
                email: user.email,
            },
            order: {
                invoice: randomNumberInvoice,
                paymentType: 'VA Bank Transfer',
                paymentChannel: randomPaymentChanel,
                virtualNumber: randomVirtualAccountNumber,
                items: [
                    { name: 'Sword',  price: '35.000' },
                    { name: 'Shield',  price: '25.000' },
                    { name: 'Wings',  price: '50.000' },
                ],
                grossAmount: '110.000',
                status: 'success',
                paidAt,
            }
        };

        const orderInvoiceEJS = await ejs.renderFile(path.join(__dirname, '../templates/order-invoice.ejs'), { data });
        sendEmail(user.email, 'Order Invoice', orderInvoiceEJS)
            .then(() => console.info(`Successfully sent order invoice email to ${user.email}`));
    },
    sendOTPEmailNotification: async (user, otp) => {
        const data = {
            user: user.name,
            otp,
        };

        const sendingOTPEJS = await ejs.renderFile(path.join(__dirname, '../templates/otp.ejs'), { data });
        sendEmail(user.email, 'Reset Password OTP', sendingOTPEJS)
            .then(() => console.info(`Successfully sent sending otp email to ${user.email}`));
    }
}
