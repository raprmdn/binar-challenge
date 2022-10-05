const { ItemGroup } = require('postman-collection');
const {
    requestRegister, requestLogin,
    requestMe, requestChangePassword
} = require('./auth.collection');

module.exports = {
    authGroup: new ItemGroup({
        name: 'Authentication Collection Endpoint',
        description: 'Authentication API Collection',
        item: [
            requestRegister,
            requestLogin,
            requestMe,
            requestChangePassword
        ]
    })
}