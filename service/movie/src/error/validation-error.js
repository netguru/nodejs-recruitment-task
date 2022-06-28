const APIerror = require("./base-error");
const errorStatusCodes = require("../common/error-codes");

const reqBodyValidationError = {
    movieError: function (message) {
        return new APIerror("Invalid request",
            errorStatusCodes.BAD_REQUEST,
            message);
    }
}

module.exports = reqBodyValidationError;
