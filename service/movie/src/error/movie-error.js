const APIerror = require("./base-error");
const errorStatusCodes = require("../common/error-codes");

const movieErrors = {
    detailsError:
        new APIerror("Invalid request",
            errorStatusCodes.NOT_FOUND,
            "No details about the movie were found. Please, refine the request"),

    collisionError: new APIerror("Conflict",
        errorStatusCodes.CONFLICT,
        "Such movie already exists"),

    privilegeError: new APIerror(
        "Limit reached", errorStatusCodes.CONFLICT,
        "Monthly movie addition limit is reached"
    )
}

module.exports = movieErrors;
