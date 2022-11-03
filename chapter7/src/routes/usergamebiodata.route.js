const express = require('express');
const UserGameBiodataController = require('../controllers/usergamebiodata.controller');
const {
    createNewCharacterValidation,
    changeNicknameValidation,
    joinOrChangeGuild, joinOrChangeFamilyValidation, gainedExpValidation
} = require("../utils/validation/usergamebiodata.validation");
const { authentication } = require("../middlewares/authentication.middleware");
const { hasRoles } = require('../middlewares/authorization.middleware');
const { uploadCharacterAvatar } = require("../middlewares/multer.middleware");
const { uploadAvatarValidation } = require("../utils/validation/upload.validation");

const router = express.Router();

router.get('/', authentication, UserGameBiodataController.getUserCharacters);
router.post('/', authentication, uploadCharacterAvatar, createNewCharacterValidation, UserGameBiodataController.createNewCharacter);

router.patch('/:nickname/change-nickname', authentication, hasRoles('admin'), changeNicknameValidation, UserGameBiodataController.changeNickname);

router.patch('/:nickname/join-guild', authentication, joinOrChangeGuild, UserGameBiodataController.joinGuild);
router.patch('/:nickname/change-guild', authentication, joinOrChangeGuild, UserGameBiodataController.changeGuild);
router.delete('/:nickname/leave-guild', authentication, UserGameBiodataController.leaveGuild);

router.patch('/:nickname/join-family', authentication, joinOrChangeFamilyValidation, UserGameBiodataController.joinFamily);
router.patch('/:nickname/change-family', authentication, joinOrChangeFamilyValidation, UserGameBiodataController.changeFamily);
router.delete('/:nickname/leave-family', authentication, UserGameBiodataController.leaveFamily);

router.patch('/:nickname/gained-exp', authentication, hasRoles('admin'), gainedExpValidation, UserGameBiodataController.gainedExp);
router.patch('/:nickname/level-up', authentication, hasRoles('admin'), UserGameBiodataController.levelUp);

router.delete('/:nickname/delete-character', authentication, hasRoles('admin'), UserGameBiodataController.deleteCharacter);

router.put('/:nickname/avatar', authentication, uploadCharacterAvatar, uploadAvatarValidation, UserGameBiodataController.uploadOrUpdateAvatar)

module.exports = router;
