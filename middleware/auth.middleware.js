const authValidator = require('../validators/auth.validator');
const ApiError = require("../error/ApiError");


module.exports = {
    isBodyValid: async (req, res, next) => {
        try {

            let validate = authValidator.loginValidator.validate(req.body);

            if (validate.error) {
                throw new ApiError(validate.error.message);
            }

            next();
        } catch (e) {
            next(e)
        }

    }
}