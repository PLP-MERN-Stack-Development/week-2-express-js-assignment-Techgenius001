// Authentication Middleware
// Checks for a valid x-api-key header in the request

const VALID_API_KEY = "mysecretkey123"; // You can change this to any value or load from env

function auth(req, res, next) {
  const apiKey = req.header("x-api-key");
  if (!apiKey || apiKey !== VALID_API_KEY) {
    // Respond with 401 Unauthorized if API key is missing or invalid
    return res
      .status(401)
      .json({ error: "Unauthorized: Invalid or missing API key" });
  }
  next(); // API key is valid, proceed to next middleware/handler
}

module.exports = auth;
