const bcrypt = require('bcrypt');
const ApiError = require("../error/ApiError");
const jwt = require('jsonwebtoken');

module.exports = {
    hashPassword: (password) => bcrypt.hash(password, 10),

    comparePasswords: async (hashPassword, password) => {
        const isPasswordsSame = await bcrypt.compare(password, hashPassword);

        if (!isPasswordsSame){
            throw new ApiError('Wrong email or password', 400);
        }
    },

    generateAccessTokenPair: (dataToSign = {}) => {
        const accessToken = jwt.sign(dataToSign, 'secretWorld', {expiresIn: '15m'});
        const refreshToken = jwt.sign(dataToSign, 'secretRefreshWorld', {expiresIn: '30d'});

        return {
            accessToken,
            refreshToken
        }
    }
}