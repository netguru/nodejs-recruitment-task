const APIerror = require("./base-error");
const errorStatusCodes = require("../common/error-codes");

const authErrors = {
    authMissing:
        new APIerror("UNAUTHORIZED", errorStatusCodes.UNAUTHORIZED, "Authorization header is missing" ),
    invalidToken: function(error){
        return new APIerror("UNAUTHORIZED",
            errorStatusCodes.UNAUTHORIZED,
            error.message)
    }
}

module.exports = authErrors;
