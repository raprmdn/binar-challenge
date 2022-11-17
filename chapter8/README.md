## Binar Chapter 7 - Challenge

- ExpressJS - Google and Facebook OAuth2 Implementation, Role and Media Handling with multer.

Dependencies that used in this challenge:
- [google-auth-library](https://www.npmjs.com/package/google-auth-library)
- [multer](https://www.npmjs.com/package/multer)
- [axios](https://www.npmjs.com/package/axios)

## Installation

```bash
npm install
```

Before running the app, you need to configure the environment variables in ```.env``` file. You can copy the ```.env.example``` file and rename it to ```.env```.
<br/>

Go to [Google Cloud Platform](https://console.cloud.google.com/) and create a new project. Then, go to [Google Cloud Platform Credentials](https://console.cloud.google.com/apis/credentials) and create a new OAuth Client ID. Copy the Client ID and Client Secret and paste it to ```.env``` file.
```bash
GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET
# You can change this to your own redirect URI. 
# Make sure to change it in Google Cloud Platform Credentials as well.
GOOGLE_REDIRECT_URI=http://localhost:5000/api/auth/google/callback
```

Go to [Facebook for Developers](https://developers.facebook.com/) and create a new app. Then, go to [Facebook for Developers App Dashboard](https://developers.facebook.com/apps/) and create a new OAuth Client ID. Copy the Client ID and Client Secret and paste it to ```.env``` file.
```bash
FACEBOOK_CLIENT_ID=YOUR_FACEBOOK_CLIENT_ID
FACEBOOK_CLIENT_SECRET=YOUR_FACEBOOK_CLIENT_SECRET
# You can change this to your own redirect URI. 
# Make sure to change it in Facebook for Developers App Dashboard as well.
FACEBOOK_REDIRECT_URI=http://localhost:5000/api/auth/facebook/callback
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

#### GET ```/api/auth/google``` - Sign In with Google
#### GET ```/api/auth/google/callback``` - Callback after Sign In with Google
<br/>

#### GET ```/api/auth/facebook``` - Sign In with Facebook
#### GET ```/api/auth/facebook/callback``` - Callback after Sign In with Facebook
<br/>

####  POST ```/api/auth/register``` - Register User
##### Request Body: ```Content-Type: multipart/form-data```
- name: ```string```  ```*required```
- username: ```string``` ```unique```  ```*required```
- email: ```string``` ```unique``` ```*required```
- password: ```string``` ```*required```
- password_confirmation: ```string``` ```*required```
- avatar: ```file: png, jpeg, gif, svg, webp``` ```max: 5MB```  ```*optional```
 <br/>

#### PUT ```/api/auth/avatar``` - Update User Avatar
##### Request Body: ```Content-Type: multipart/form-data```
- avatar: ```file: png, jpeg, gif, svg, webp``` ```max: 5MB```  ```*required```
<br/>

#### PUT ```/api/characters/:nickname/avatar``` - Update User Character Avatar
##### Request Body: ```Content-Type: multipart/form-data```
- avatar: ```file: png, jpeg, gif, svg, webp``` ```max: 5MB```  ```*required```
<br/>

#### POST ```/api/upload/media``` - Random File Upload ```*admin```
##### Request Body: ```Content-Type: multipart/form-data```
- media: ```file: support any file type``` ```*required```
<br/>

####  PATCH ```/api/characters/:nickname/change-nickname``` - Change Character Nickname ```*admin```
##### Request Header:
- Authorization: ```Bearer <token>``` ```*required```
##### Request Body: ```Content-Type: application/json```
- id: ```integer``` ```*required```
- nickname: ```string``` ```*required```
<br/>

####  PATCH ```/api/characters/:nickname/gained-exp``` - Gained Characters Experience ```*admin```
##### Request Header:
- Authorization: ```Bearer <token>``` ```*required```
##### Request Body: ```Content-Type: application/json```
- id: ```integer``` ```*required```
- gained_exp ```integer``` ```*required```
<br/>

####  PATCH ```/api/characters/:nickname/level-up``` - Level Up Character ```*admin```
##### Request Header:
- Authorization: ```Bearer <token>``` ```*required```
<br/>

####  DELETE ```/api/characters/:nickname/delete-character``` - Delete Character User ```*admin```
##### Request Header:
- Authorization: ```Bearer <token>``` ```*required```
