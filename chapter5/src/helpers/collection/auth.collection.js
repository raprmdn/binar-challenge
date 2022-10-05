const { Item } = require('postman-collection');
const baseURL = 'http://localhost:5000';

const header = [
    { key: 'Content-Type', value: 'application/json' },
    { key: 'cache-control', value: 'no-cache' }
];

const setToken = `
if (pm.response.code === 200) {
    pm.environment.set("token", pm.response.json().data.user.token);
}
`;

const register = {
    name: 'Register',
    method: 'POST',
    url: `${baseURL}/api/auth/register`,
    header: header,
    payload: {
        "name": "Rafi Putra Ramadhan",
        "username": "raprmdn",
        "email": "raprmdn@gmail.com",
        "password": "Abc123456!",
        "password_confirmation": "Abc123456!"
    }
};

const login = {
    name: 'Login',
    method: 'POST',
    url: `${baseURL}/api/auth/login`,
    header: header,
    payload: {
        "email": "raprmdn@gmail.com",
        "password": "Abc123456!"
    }
};

const me = {
    name: 'Get Authenticated User',
    method: 'GET',
    url: `${baseURL}/api/auth/me`,
    header: header
}

const changePassword = {
    name: 'Change Password',
    method: 'PATCH',
    url: `${baseURL}/api/auth/change-password`,
    header: header,
    payload: {
        "current_password": "Abc123456!",
        "new_password": "Abc123456!",
        "password_confirmation": "Abc123456!"
    }
}

module.exports = {
    requestRegister: new Item({
        name: register.name,
        request: {
            url: register.url,
            header: register.header,
            method: register.method,
            body: {
                mode: 'raw',
                raw: JSON.stringify(register.payload)
            },
            description: 'Register a new user'
        }
    }),
    requestLogin: new Item({
        name: login.name,
        request: {
            url: login.url,
            header: login.header,
            method: login.method,
            body: {
                mode: 'raw',
                raw: JSON.stringify(login.payload)
            },
            description: 'Login to get token',
        },
        event: [
            {
                listen: 'test',
                script: {
                    type: 'text/javascript',
                    exec: setToken
                }
            }
        ]
    }),
    requestMe: new Item({
        name: me.name,
        request: {
            url: me.url,
            header: me.header,
            method: me.method,
            description: 'Get authenticated user',
            auth: {
                type: 'bearer',
                bearer: [
                    {
                        key: 'token',
                        value: '{{token}}',
                    }
                ]
            },
        }
    }),
    requestChangePassword: new Item({
        name: changePassword.name,
        request: {
            url: changePassword.url,
            header: changePassword.header,
            method: changePassword.method,
            body: {
                mode: 'raw',
                raw: JSON.stringify(changePassword.payload)
            },
            description: 'Change password',
            auth: {
                type: 'bearer',
                bearer: [
                    {
                        key: 'token',
                        value: '{{token}}',
                    }
                ]
            }
        }
    })
}