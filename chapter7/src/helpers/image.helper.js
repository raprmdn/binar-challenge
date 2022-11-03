const fs = require('fs');

module.exports = {
    getAvatarUserUrl: (avatar) => `${process.env.APP_URL || 'http://localhost:5000'}/storage/images/users/${avatar}`,
    removeUploadedFile: (uploadedFile) => {
        fs.unlinkSync(uploadedFile.path);
    },
};
