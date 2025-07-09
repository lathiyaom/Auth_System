const bcrypt = require('bcrypt')

const jsonwebtoken = require("jsonwebtoken")

const { ServerConfig } = require("../../config")

async function checkPassword(palinPassword, encryptedPassword) {

    try {

        return bcrypt.compareSync(palinPassword, encryptedPassword);

    } catch (error) {
        console.log(error);
        throw error;

    }

}

async function creatToken(input) {

    try {

        return jsonwebtoken.sign(input, ServerConfig.JWT_SECRATE, { expiresIn: ServerConfig.JWT_EXPIRY })

    } catch (error) {

        console.log(error);
        throw error;

    }

}


async function verifyToken(jwtToken) {

    try {

        return jsonwebtoken.verify(jwtToken, ServerConfig.JWT_SECRATE);
    } catch (error) {

        console.lof(error)
        throw error;
    }

}

module.exports = {
    checkPassword,
    creatToken,
    verifyToken
}