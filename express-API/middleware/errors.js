// Custom Error Classes
// For use in global error handling middleware

// NotFoundError: for 404 errors
class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
    this.status = 404;
  }
}

// ValidationError: for 400 errors
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
    this.status = 400;
  }
}

module.exports = { NotFoundError, ValidationError };
