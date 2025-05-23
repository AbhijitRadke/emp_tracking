// src/utils/validation.js
const Joi = require('joi');

/**
 * Validates data against a Joi schema.
 * @param {object} data - The data to validate.
 * @param {object} schema - The Joi schema to validate against.
 * @returns {{value: object, error: Joi.ValidationError | undefined}} The validation result.
 */
const validateData = (data, schema) => {
    return schema.validate(data, { abortEarly: false, stripUnknown: true });
};

// Example common schemas (can be expanded as needed)

const idSchema = Joi.number().integer().positive();

const emailSchema = Joi.string().email();

const passwordSchema = Joi.string().min(8).max(128);

module.exports = {
    validateData,
    idSchema,
    emailSchema,
    passwordSchema,
    Joi, // Export Joi itself for creating custom schemas in services/controllers
};