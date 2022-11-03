const fs = require('fs');

module.exports = {
    getAvatarUserUrl: (avatar) => `${process.env.APP_URL || 'http://localhost:5000'}/storage/images/users/${avatar}`,
    getAvatarCharacterUrl: (avatar) => `${process.env.APP_URL || 'http://localhost:5000'}/storage/images/characters/${avatar}`,
    removeUploadedFile: (uploadedFile) => uploadedFile && fs.unlinkSync(uploadedFile.path),
};
