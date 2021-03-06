const logReport = require('../logger/logReport');

const errorMidleware = (err, _req, res) => {
    const statusCode = [
        400, // bad request
        404, // not found
        409, // already exists
        422, // unprocessable entity
    ];

    const status = statusCode.find((code) => code === err.code) || 500;

    logReport('error', status, err.message);

    return res.status(status).json({ error: { message: err.message } });
};

module.exports = errorMidleware;