// Ensure that dotenv is loaded before accessing environment variables
require('dotenv').config();

/**
 * Environment configuration variables, safely loaded from .env file.
 * Defaults are provided where relevant.
 */
module.exports = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET || 'default_jwt_secret',
  STRIPE_KEY: process.env.STRIPE_KEY,
};
