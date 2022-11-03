module.exports = {
    uploadAvatarValidation: (req, res, next) => {
        if (!req.file) {
            return res.status(422).json({
                status: 422,
                success: false,
                message: 'The given data was invalid.',
                errors: {
                    avatar: 'Avatar is not allowed to be empty'
                }
            })
        }

        next();
    }
};
