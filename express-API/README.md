# Express Products API

A RESTful API built with Express.js for managing products. Implements CRUD operations, middleware (logging, authentication, validation), error handling, filtering, pagination, search, and statistics.

## 🚀 Features

- CRUD operations for products
- Logger, authentication, and validation middleware
- Global error handling with custom error classes
- Filtering, pagination, and search endpoints
- Product statistics endpoint

## 🛠️ Setup Instructions

1. **Clone the repository**
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set environment variables:**
   - Copy `.env.example` to `.env` and set your API key if needed.
4. **Run the server:**
   ```bash
   node server.js
   # or, for auto-reload during development:
   npx nodemon server.js
   ```
5. **Test the API:**
   Use Postman or your browser.

## 🔑 Authentication

All `/api/products` endpoints require an API key in the headers:

- **Header:** `x-api-key: mysecretkey123`

## 📚 API Endpoints

### Get All Products (with Filtering & Pagination)

```
GET /api/products?category=electronics&page=1&limit=2
```

- **Query Params:**
  - `category` (optional): filter by category
  - `page` (optional): page number
  - `limit` (optional): items per page
- **Response:**

```json
{
  "total": 2,
  "page": 1,
  "limit": 2,
  "products": [ ... ]
}
```

### Get Product by ID

```
GET /api/products/:id
```

- **Response:**

```json
{
  "id": "1",
  "name": "Laptop",
  ...
}
```

### Create Product

```
POST /api/products
Headers: x-api-key: mysecretkey123
Body (JSON):
{
  "name": "Tablet",
  "description": "10-inch Android tablet",
  "price": 300,
  "category": "electronics",
  "inStock": true
}
```

- **Response:**

```json
{
  "id": "...",
  "name": "Tablet",
  ...
}
```

### Update Product

```
PUT /api/products/:id
Headers: x-api-key: mysecretkey123
Body (JSON):
{
  "name": "Updated Name",
  "description": "Updated description",
  "price": 1000,
  "category": "electronics",
  "inStock": false
}
```

- **Response:**

```json
{
  "id": "...",
  "name": "Updated Name",
  ...
}
```

### Delete Product

```
DELETE /api/products/:id
Headers: x-api-key: mysecretkey123
```

- **Response:**

```json
{
  "message": "Product deleted",
  "product": { ... }
}
```

### Search Products by Name

```
GET /api/products/search?name=lap
Headers: x-api-key: mysecretkey123
```

- **Response:**

```json
{
  "total": 1,
  "products": [ ... ]
}
```

### Product Statistics

```
GET /api/products/stats
Headers: x-api-key: mysecretkey123
```

- **Response:**

```json
{
  "countByCategory": {
    "electronics": 2,
    "kitchen": 1
  }
}
```

## ⚠️ Error Handling

- All errors return JSON with an `error` and `message` field.
- Example:

```json
{
  "error": "NotFoundError",
  "message": "Product not found"
}
```

## 🧪 Example Environment Variables

See `.env.example` for required variables.

---
