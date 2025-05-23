// src/app.js
const express = require('express');
const cors = require('cors');
const compression = require('compression');
const morgan = require('morgan');
const logger = require('./utils/logger');
const { successResponse, errorResponse } = require('./utils/response');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json({ limit: '10kb' })); // Body parser, reading data from body into req.body
app.use(express.urlencoded({ extended: true, limit: '10kb' })); // Parse URL-encoded bodies
app.use(compression()); // Compress responses

// HTTP request logger middleware (using Morgan with Winston for more structured logging)
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
} else {
    // More structured logging for production, can be customized further
    app.use(morgan('combined', { stream: { write: (message) => logger.info(message.trim()) } }));
}

// Basic Health Check Route
app.get('/health', (req, res) => {
    successResponse(res, 200, 'Server is healthy and running!');
});

// Placeholder for API routes (to be added later)
// app.use('/api/v1/users', userRouter); 
// app.use('/api/v1/auth', authRouter);

// Global Error Handling Middleware
// This middleware should be the last one in the stack
app.use((err, req, res, next) => {
    logger.error(err.stack);
    // If the error is operational, send a specific message to the client
    if (err.isOperational) {
        return errorResponse(res, err.statusCode || 500, err.message);
    }
    // For programming or other unknown errors, don't leak error details
    errorResponse(res, 500, 'Something went very wrong!');
});

// Handle 404 Not Found errors for any unhandled routes
app.all('*', (req, res, next) => {
    errorResponse(res, 404, `Can't find ${req.originalUrl} on this server!`);
});

module.exports = app;