const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const validateProduct = require("../middleware/validateProduct");
const { NotFoundError, ValidationError } = require("../middleware/errors");

// In-memory product list (will import from server.js soon if needed)
let products = [
  {
    id: "1",
    name: "Laptop",
    description: "High-performance laptop with 16GB RAM",
    price: 1200,
    category: "electronics",
    inStock: true,
  },
  {
    id: "2",
    name: "Smartphone",
    description: "Latest model with 128GB storage",
    price: 800,
    category: "electronics",
    inStock: true,
  },
  {
    id: "3",
    name: "Coffee Maker",
    description: "Programmable coffee maker with timer",
    price: 50,
    category: "kitchen",
    inStock: false,
  },
];

/**
 * @route   GET /api/products
 * @desc    Get all products (with optional filtering and pagination)
 * @access  Public
 * @query   category (string, optional) - filter by category
 * @query   page (number, optional) - page number for pagination
 * @query   limit (number, optional) - items per page for pagination
 */
router.get("/", (req, res) => {
  let result = products;

  // Filtering by category
  if (req.query.category) {
    result = result.filter((p) => p.category === req.query.category);
  }

  // Pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || result.length;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginated = result.slice(startIndex, endIndex);

  res.json({
    total: result.length,
    page,
    limit,
    products: paginated,
  });
});

/**
 * @route   GET /api/products/:id
 * @desc    Get a product by ID
 * @access  Public
 */
router.get("/:id", (req, res, next) => {
  const product = products.find((p) => p.id === req.params.id);
  if (!product) {
    // If not found, throw NotFoundError
    return next(new NotFoundError("Product not found"));
  }
  res.json(product);
});

/**
 * @route   POST /api/products
 * @desc    Create a new product
 * @access  Public (will add auth later)
 */
router.post("/", validateProduct, (req, res) => {
  // If validation passes, create the product
  const { name, description, price, category, inStock } = req.body;
  const newProduct = {
    id: uuidv4(),
    name,
    description,
    price,
    category,
    inStock,
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

/**
 * @route   PUT /api/products/:id
 * @desc    Update an existing product by ID
 * @access  Public (will add auth later)
 */
router.put("/:id", validateProduct, (req, res, next) => {
  const productIndex = products.findIndex((p) => p.id === req.params.id);
  if (productIndex === -1) {
    // If not found, throw NotFoundError
    return next(new NotFoundError("Product not found"));
  }
  // If validation passes, update the product
  const { name, description, price, category, inStock } = req.body;
  products[productIndex] = {
    id: req.params.id,
    name,
    description,
    price,
    category,
    inStock,
  };
  res.json(products[productIndex]);
});

/**
 * @route   DELETE /api/products/:id
 * @desc    Delete a product by ID
 * @access  Public (will add auth later)
 */
router.delete("/:id", (req, res, next) => {
  const productIndex = products.findIndex((p) => p.id === req.params.id);
  if (productIndex === -1) {
    // If not found, throw NotFoundError
    return next(new NotFoundError("Product not found"));
  }
  // Remove product from array
  const deletedProduct = products.splice(productIndex, 1);
  res.json({ message: "Product deleted", product: deletedProduct[0] });
});

/**
 * @route   GET /api/products/search
 * @desc    Search products by name (case-insensitive, partial match)
 * @access  Public
 * @query   name (string, required) - search term
 */
router.get("/search", (req, res) => {
  const { name } = req.query;
  if (!name) {
    return res
      .status(400)
      .json({ error: 'Query parameter "name" is required.' });
  }
  const searchTerm = name.toLowerCase();
  const results = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm)
  );
  res.json({ total: results.length, products: results });
});

/**
 * @route   GET /api/products/stats
 * @desc    Get product statistics (count by category)
 * @access  Public
 */
router.get("/stats", (req, res) => {
  const stats = {};
  products.forEach((p) => {
    stats[p.category] = (stats[p.category] || 0) + 1;
  });
  res.json({ countByCategory: stats });
});

// Export router
module.exports = router;
