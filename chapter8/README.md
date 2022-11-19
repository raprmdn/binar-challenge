## Binar Chapter 8 - Challenge

- ExpressJS - Nodemailer and Web Push Notification.

Dependencies that used in this challenge:
- [google-auth-library](https://www.npmjs.com/package/google-auth-library)
- [nodemailer](https://www.npmjs.com/package/nodemailer)
- [web-push](https://www.npmjs.com/package/web-push)

Features that updated in this challenge:
- [x] Send email using nodemailer with Gmail SMTP.
  - send welcome email to new user after register.
  - send email to user when user forgot password with OTP (One Time Password).
  - send example email to user to get order information.
- [x] Send push notification using web-push (web only).
  - send web push notification to new user after register (register in web only).

## Installation

```bash
npm install
```

Before running the app, you need to configure the environment variables in ```.env``` file. You can copy the ```.env.example``` file and rename it to ```.env```.
<br/>

Go to [Google Cloud Platform](https://console.cloud.google.com/) and create a new project. Then, go to [Google Cloud Platform Credentials](https://console.cloud.google.com/apis/credentials) and create a new OAuth Client ID. Copy the Client ID and Client Secret and paste it to ```.env``` file.

To get the `GOOGLE_REFRESH_TOKEN` you need to run the app first. Then, go to [Google OAuth Playground](https://developers.google.com/oauthplayground/) and select the `https://mail.google.com/` scope.

Click OAuth 2.0 Configuration icon on the top right corner and select Use your own OAuth credentials. Paste the Client ID and Client Secret that you copied before.

Then, click the `Authorize APIs` button and login with your Google account. After that, click the `Exchange authorization code for tokens` button. Copy the `Refresh Token` and paste it to the `GOOGLE_REFRESH_TOKEN` in ```.env``` file.

Make sure set the `GOOGLE_EMAIL` is the same email that you use to login to Google OAuth Playground.

```bash
GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET
# You can change this to your own redirect URI. 
# Make sure to change it in Google Cloud Platform Credentials as well.
GOOGLE_REDIRECT_URI=http://localhost:5000/api/auth/google/callback
# Setup for nodemailer
GOOGLE_REFRESH_TOKEN=
GOOGLE_EMAIL=
```

Get the `VAPID_PUBLIC_KEY` and `VAPID_PRIVATE_KEY` from [web-push](https://www.npmjs.com/package/web-push).

Install the [web-push](https://www.npmjs.com/package/web-push) globally, with the following command:
```bash
npm install -g web-push
```

Then, run the following command to generate the `VAPID_PUBLIC_KEY` and `VAPID_PRIVATE_KEY`:
```bash
web-push generate-vapid-keys
```

Copy the `VAPID_PUBLIC_KEY` and `VAPID_PRIVATE_KEY` and paste it to the ```.env``` file.

```bash
# Setup for web push notification
VAPID_PUBLIC_KEY=
VAPID_PRIVATE_KEY=
```

Go to file `public/script.js` and change the `VAPID_PUBLIC_KEY` with the one that you copied before.

```javascript
// Line 23 - 26
const subscription = await register.pushManager.subscribe({
 userVisibleOnly: true,
 applicationServerKey: '', // Change this with your VAPID_PUBLIC_KEY
});
```

## Running the app
> **Note:** Make sure you have installed global dependencies: [nodemon](https://www.npmjs.com/package/nodemon), [sequelize-cli](https://www.npmjs.com/package/sequelize-cli).

```bash
# Create Database
sequelize db:create

# Migrate the database
sequelize db:migrate

# Seeder *Optional
# Generate seeder will automatically set 1 user with role admin
sequelize db:seed:all

# Run the app
npm run dev
```

## Endpoint

#### GET ```/register``` - Sign Up Page

<br/>

#### POST ```/api/auth/forgot-password``` - Request OTP Forgot Password
##### Request Body: ```Content-Type: application/json```
- email: ```string``` ```*required```

<br/>

#### PUT ```/api/auth/reset-password``` - Reset Password with OTP
##### Request Body: ```Content-Type: application/json```
- email: ```string``` ```*required```
- otp: ```number``` ```*required```
- password: ```string``` ```*required```
- password_confirmation: ```string``` ```*required```

<br/>

#### GET ```/api/order-invoice``` - Get Example Order Invoice Email
##### Request Header:
- Authorization: ```Bearer <token>``` ```*required```
