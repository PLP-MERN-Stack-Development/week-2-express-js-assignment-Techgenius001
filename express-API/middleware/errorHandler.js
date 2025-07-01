// Global Error Handling Middleware
// Handles custom and generic errors, returns JSON response

function errorHandler(err, req, res, next) {
  // If error has a status, use it; otherwise, 500
  const status = err.status || 500;
  res.status(status).json({
    error: err.name || "ServerError",
    message: err.message || "An unexpected error occurred.",
  });
}

module.exports = errorHandler;
