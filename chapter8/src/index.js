require('dotenv').config();
const express = require('express');
const compression = require('compression');
const ejs = require('ejs');
const path = require('path');
const webPush = require('web-push');
const helmet = require('helmet');
const morgan = require('morgan');
const routes = require('./routes');

const app = express();
const port = process.env.PORT || 5000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/public', express.static('public'));
app.use('/storage', express.static('storage'));
app.use('/worker.js', express.static(path.join(__dirname, 'worker.js')));

app.use(compression());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api', routes);

app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to Chapter 8 - Binar Challenge - Nodemailer and Notification",
    });
});

app.get('/register', (req, res) => {
    res.render('registration');
});

webPush.setVapidDetails(
    'mailto:me@email.com',
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY,
);

app.post('/register-notification', async (req, res) => {
    const subs = req.body;
    const payload = JSON.stringify({
        title: 'Thanks!',
        body: 'Thanks for registering to our website!',
    });
    const result = await webPush.sendNotification(subs, payload);

    res.status(200).json(result);
});

app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
});
