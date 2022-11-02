module.exports = {
    hasRoles: (roles = []) => {
        if (typeof roles === 'string') roles = [roles];

        return [
            (req, res, next) => {
                if (roles.length && !roles.includes(req.user.role)) {
                    return res.status(403).json({ status: 403, success: false, message: 'You\'re not authorized to access this resource' });
                }

                next();
            }
        ];
    }
};
