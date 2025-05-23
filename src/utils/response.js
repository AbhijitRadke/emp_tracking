// src/utils/response.js

/**
 * Sends a success response.
 * @param {object} res - Express response object.
 * @param {number} statusCode - HTTP status code.
 * @param {string} message - Success message.
 * @param {object} [data] - Data to be sent in the response body.
 */
const successResponse = (res, statusCode, message, data) => {
    res.status(statusCode).json({
        status: 'success',
        message,
        data,
    });
};

/**
 * Sends an error response.
 * @param {object} res - Express response object.
 * @param {number} statusCode - HTTP status code.
 * @param {string} message - Error message.
 */
const errorResponse = (res, statusCode, message) => {
    res.status(statusCode).json({
        status: 'error',
        message,
    });
};

module.exports = {
    successResponse,
    errorResponse,
};