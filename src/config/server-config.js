const dotenv = require("dotenv");

const logger = require("./logger-config");

const result = dotenv.config();

if (result.error) {
  logger.error("Failed to load .env file", result.error);
} else {
  logger.info(".env file loaded successfully");
}

module.exports = {
  PORT: process.env.PORT,
  SALT_ROUNDS: process.env.SALT_ROUNDS
};
