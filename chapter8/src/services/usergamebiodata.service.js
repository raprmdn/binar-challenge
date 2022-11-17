const {UserGameBiodata, UserGame} = require('../models');
const {Sequelize} = require("sequelize");
const fs = require("fs");

const BASE_HP = 3000;
const BASE_MANA = 1500;

const propsMapRace = {
    "Human": {
        HP: 1200,
        MANA: 700
    },
    "Elf": {
        HP: 1050,
        MANA: 800
    },
    "Majin": {
        HP: 980,
        MANA: 700
    }
};

const propsMapClassType = {
    "Fighter": {
        HP: 700,
        MANA: 500
    },
    "Rogue": {
        HP: 600,
        MANA: 600
    },
    "Mage": {
        HP: 800,
        MANA: 700,
    }
}

const customizeCharacter = (race, type) => {
    const healthFromRace = propsMapRace[race].HP;
    const manaFromRace = propsMapRace[race].MANA;
    const healthFromClassType = propsMapClassType[type].HP;
    const manaFromClassType = propsMapClassType[type].MANA;

    const totalHealth = BASE_HP + healthFromRace + healthFromClassType;
    const totalMana = BASE_MANA + manaFromRace + manaFromClassType;

    return {totalHealth, totalMana}
}

module.exports = {
    getUserCharacters: async (auth) => {
        const user = await UserGame.findByPk(auth.id);
        if (!user) throw { status: 404, message: "User not found" }

        return await UserGameBiodata.findAndCountAll({
            where: {
                userId: user.id
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'userId']
            }
        });
    },
    createNewCharacter: async (req) => {
        const { id } = req.user;
        const attr = req.body;

        const user = await UserGame.findByPk(id);
        if (!user) throw { status: 404, message: "User not found" };

        const {totalHealth: health, totalMana: mana} = customizeCharacter(attr.race, attr.type)
        attr.health = health;
        attr.mana = mana;
        attr.avatar = req.file?.filename;

        return await user.createBiodata(attr);
    },
    changeNickname: async (params, auth, attr) => {
        const character = await UserGameBiodata.findOne({where: {nickname: params.nickname}})

        if (!character) throw {status: 404, message: "Character not found"};
        if (character.id !== attr.id) throw {status: 400, message: "Character id is not valid"};

        return await character.update({ nickname: attr.nickname });
    },
    joinOrChangeGuild: async (params, auth, attr) => {
        const character = await UserGameBiodata.findOne({where: {nickname: params.nickname}})

        if (!character) throw {status: 404, message: "Character not found"};
        if (character.id !== attr.id) throw {status: 400, message: "Character id is not valid"};
        if (character.userId !== auth.id) throw {status: 403, message: "You are not allowed to change this character's guild"};

        return await character.update({ guild: attr.guild });
    },
    leaveGuild: async (params, auth) => {
        const character = await UserGameBiodata.findOne({where: {nickname: params.nickname}})

        if (!character) throw {status: 404, message: "Character not found"};
        if (!character.guild) throw {status: 400, message: "Character is not in any guild"};
        if (character.userId !== auth.id) throw {status: 403, message: "You are not allowed to change this character's guild"};

        return await character.update({ guild: null });
    },
    joinOrChangeFamily: async (params, auth, attr) => {
        const character = await UserGameBiodata.findOne({where: {nickname: params.nickname}})

        if (!character) throw {status: 404, message: "Character not found"};
        if (character.id !== attr.id) throw {status: 400, message: "Character id is not valid"};
        if (character.userId !== auth.id) throw {status: 403, message: "You are not allowed to change this character's family"};

        return await character.update({ family: attr.family });
    },
    leaveFamily: async (params, auth) => {
        const character = await UserGameBiodata.findOne({where: {nickname: params.nickname}})

        if (!character) throw {status: 404, message: "Character not found"};
        if (!character.family) throw {status: 400, message: "Character is not in any family"};
        if (character.userId !== auth.id) throw {status: 403, message: "You are not allowed to change this character's family"};

        return await character.update({ family: null });
    },
    gainedExp: async (params, auth, attr) => {
        const character = await UserGameBiodata.findOne({where: {nickname: params.nickname}})

        if (!character) throw {status: 404, message: "Character not found"};
        if (character.id !== attr.id) throw {status: 400, message: "Character id is not valid"};

        return await character.update({ experience: parseInt(character.experience) + attr.gained_exp });
    },
    levelUp: async (params, auth) => {
        const character = await UserGameBiodata.findOne({where: {nickname: params.nickname}})

        if (!character) throw {status: 404, message: "Character not found"};

        return await character.update({ level: parseInt(character.level) + 1 });
    },
    deleteCharacter: async (params, auth) => {
        const user = await UserGame.findByPk(auth.id);
        if (!user) throw {status: 404, message: "User not found"};

        const character = await UserGameBiodata.findOne({where: {nickname: params.nickname}})
        if (!character) throw {status: 404, message: "Character not found"};

        return await character.destroy();
    },
    uploadOrUpdateAvatar: async (req) => {
        const { id } = req.user;
        const user = await UserGame.findByPk(id);
        if (!user) throw { status: 404, message: "User not found" }

        const { nickname } = req.params;
        const character = await UserGameBiodata.findOne({ where: { nickname } });
        if (!character) throw { status: 404, message: "Character not found" }
        if (character.userId !== user.id) throw { status: 403, message: "You are not allowed to change this character's avatar" }

        if (character.avatar) fs.unlinkSync(`./storage/images/characters/${character.avatar}`);

        return await character.update({ avatar: req.file?.filename });
    }
};
