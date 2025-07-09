class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode; // ✅ Fix: Use capital C
    this.explanation = message;
  }
}

module.exports = AppError;
