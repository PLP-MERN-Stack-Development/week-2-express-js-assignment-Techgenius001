// Validation Middleware for Product
// Ensures all required product fields are present and valid

function validateProduct(req, res, next) {
  const { name, description, price, category, inStock } = req.body;
  let errors = [];

  if (!name || typeof name !== "string") {
    errors.push("Name is required and must be a string.");
  }
  if (!description || typeof description !== "string") {
    errors.push("Description is required and must be a string.");
  }
  if (typeof price !== "number") {
    errors.push("Price is required and must be a number.");
  }
  if (!category || typeof category !== "string") {
    errors.push("Category is required and must be a string.");
  }
  if (typeof inStock !== "boolean") {
    errors.push("inStock is required and must be a boolean.");
  }

  if (errors.length > 0) {
    // Respond with 400 Bad Request and error details
    return res.status(400).json({ errors });
  }
  next(); // Data is valid, proceed to next middleware/handler
}

module.exports = validateProduct;
