const constants = {
    routes: {
        movie: {
            main: "/movie",
            create: "/create",
            get: "/get",
        }

    },
    errorStatusCodes: {
        BAD_REQUEST: 400,
        UNAUTHORIZED: 401,
        NOT_FOUND: 404,
        CONFLICT: 409,
    },
};

module.exports = constants;
