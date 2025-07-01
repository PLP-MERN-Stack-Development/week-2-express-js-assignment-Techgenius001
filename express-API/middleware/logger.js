// Logger Middleware
// Logs the HTTP method, URL, and timestamp for each incoming request

function logger(req, res, next) {
  const now = new Date();
  console.log(`[${now.toISOString()}] ${req.method} ${req.originalUrl}`);
  next(); // Pass control to the next middleware/handler
}

module.exports = logger;
