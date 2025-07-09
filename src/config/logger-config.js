const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf, json, colorize, errors } = format;

const DailyRotateFile = require("winston-daily-rotate-file");

// Pretty log format for console
const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} | ${level}: ${stack || message}`;
});

// Detect environment (standard: NODE_ENV)
const isProduction = process.env.NODE_ENV === "production";

// Setup transports
const transportList = [
  // Console
  new transports.Console({
    format: combine(
      colorize(),
      timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      errors({ stack: true }),
      logFormat
    ),
    handleExceptions: true,
  }),

  // Daily Rotate - Application Logs
  new DailyRotateFile({
    filename: "logs/application-%DATE%.log",
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    maxSize: "20m",
    maxFiles: "14d",
    level: isProduction ? "info" : "debug",
    format: combine(timestamp(), errors({ stack: true }), json()),
  }),

  // Daily Rotate - Error Logs
  new DailyRotateFile({
    filename: "logs/error-%DATE%.log",
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    maxSize: "20m",
    maxFiles: "30d",
    level: "error",
    format: combine(timestamp(), errors({ stack: true }), json()),
  }),
];

// Create Winston logger
const logger = createLogger({
  level: isProduction ? "info" : "debug",
  format: combine(timestamp(), errors({ stack: true }), json()),
  transports: transportList,
  exitOnError: false, // don't exit on exceptions
});

// Global handler for unhandled promise rejections
process.on("unhandledRejection", (err) => {
  logger.error("Unhandled Rejection", err);
});

module.exports = logger;
