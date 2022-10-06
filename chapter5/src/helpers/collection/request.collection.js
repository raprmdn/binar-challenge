const { ItemGroup } = require('postman-collection');
const {
    requestRegister, requestLogin,
    requestMe, requestChangePassword
} = require('./auth.collection');
const {
    requestGetCharacters, requestCreateCharacter,
    requestChangeCharacterNickname, requestCharacterJoinGuild,
    requestCharacterChangeGuild, requestCharacterLeaveGuild,
    requestCharacterJoinFamily, requestCharacterChangeFamily,
    requestCharacterLeaveFamily, requestCharacterGainedExp,
    requestCharacterLevelUp, requestDeleteCharacter
} = require('./characters.collection');

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
    }),
    charactersGroup: new ItemGroup({
        name: 'Characters Collection Endpoint',
        description: 'Characters / User Game Biodata API Collection',
        item: [
            requestGetCharacters,
            requestCreateCharacter,
            requestChangeCharacterNickname,
            requestCharacterJoinGuild,
            requestCharacterChangeGuild,
            requestCharacterLeaveGuild,
            requestCharacterJoinFamily,
            requestCharacterChangeFamily,
            requestCharacterLeaveFamily,
            requestCharacterGainedExp,
            requestCharacterLevelUp,
            requestDeleteCharacter
        ]
    })
}