const express = require('express');
const UserGameRouter = require('./usergame.route');
const UserGameBiodataRouter = require('./usergamebiodata.route');
const UserGameHistoryRouter = require('./usergamehistory.route');
const { uploadRandomFile } = require("../middlewares/multer.middleware");
const { authentication } = require("../middlewares/authentication.middleware");
const { hasRoles } = require("../middlewares/authorization.middleware");
const { orderInvoiceEmailNotification } = require("../helpers/mail.helper");

const router = express.Router();

router.use('/auth', UserGameRouter);
router.use('/characters', UserGameBiodataRouter);
router.use('/histories', UserGameHistoryRouter);

router.post('/upload/media', authentication, hasRoles('admin'), uploadRandomFile, (req, res) => {
    if (!req.file) {
        return res.status(422).json({
            status: 422,
            success: false,
            message: 'The given data was invalid.',
            errors: {
                media: 'Media is not allowed to be empty'
            }
        });
    }

    return res.json({
        status: 200,
        success: true,
        message: 'File uploaded successfully.',
        data: {
            file: req.file
        }
    });
});

router.get('/order-invoice', authentication, async (req, res) => {
    await orderInvoiceEmailNotification(req.user);

    return res.status(200).json({
        status: 200,
        success: true,
        message: 'Order invoice has been sent to your email.',
    });
});

module.exports = router;
