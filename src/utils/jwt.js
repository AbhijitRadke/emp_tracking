// src/utils/jwt.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

/**
 * Generates a JWT token.
 * @param {object} payload - The payload to include in the token.
 * @param {string} [expiresIn] - The expiration time for the token (e.g., '1h', '7d').
 * @returns {string} The generated JWT token.
 */
const generateToken = (payload, expiresIn = JWT_EXPIRES_IN) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

/**
 * Verifies a JWT token.
 * @param {string} token - The JWT token to verify.
 * @returns {object|null} The decoded payload if the token is valid, otherwise null.
 */
const verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        // console.error('JWT verification error:', error.message);
        return null;
    }
};

module.exports = {
    generateToken,
    verifyToken,
};