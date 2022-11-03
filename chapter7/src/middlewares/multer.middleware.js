const multer = require('multer');
const fs = require('fs');
const { extensions } = require('../helpers/extensions.helper');
const crypto = require('crypto');

const upload = (path) => multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            const filePath = `./storage/images/${path}`;
            fs.mkdirSync(filePath, { recursive: true });
            cb(null, filePath);
        },
        filename: (req, file, cb) => {
            const randomString = crypto.randomBytes(16).toString("hex");
            cb(null, `${randomString}.${file.mimetype.split('/')[1]}`);
        },
    }),
    fileFilter: (req, file, cb) => {
        if (!extensions(file.mimetype)) {
            cb(new Error('File type is not supported. Only support PNG, JPEG, JPG, GIF, SVG, and WEBP.'), false);
        } else {
            cb(null, true);
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 5
    },
});

const userAvatar = upload('users').single('avatar');
const characterAvatar = upload('characters').single('avatar');

module.exports = {
    uploadUserAvatar: (req, res, next) => {
        userAvatar(req, res, (err) => {
            if (err) {
                return res.status(422).json({
                    status: 422,
                    success: false,
                    message: 'The given data was invalid.',
                    errors: {
                        avatar: err.message
                    }
                });
            }

            next();
        });
    },
    uploadCharacterAvatar: async (req, res, next) => {
        characterAvatar(req, res, (err) => {
            if (err) {
                return res.status(422).json({
                    status: 422,
                    success: false,
                    message: 'The given data was invalid.',
                    errors: {
                        avatar: err.message
                    }
                });
            }

            next();
        })
    }
};
