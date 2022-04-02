const httpResponse = (res, result) => {
    const { status, error, message, data, statusCode } = result;
    res.status(statusCode).json({ status, message, data, error });
};

module.exports = { httpResponse };
