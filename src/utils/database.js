// src/utils/database.js
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432, // Default PostgreSQL port
});

pool.on('connect', () => {
  console.log('Connected to the database');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

/**
 * Utility function to execute SQL queries using the connection pool.
 * @param {string} text - The SQL query string.
 * @param {Array} params - The parameters for the SQL query.
 * @returns {Promise<QueryResult>} The result of the query.
 */
const poolQuery = (text, params) => pool.query(text, params);

module.exports = {
  poolQuery,
  pool, // Exporting the pool itself can be useful for transactions or direct access
};