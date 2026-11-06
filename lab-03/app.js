/**
 * ============================================================================
 * Course: Backend Development Fundamentals
 * Lab Number: 03 - REST API, Query Parameters, Validation and Debugging
 * Student Name: Kasula Thanish
 * Registration Number: 252U1R9063
 * Section: CSE-GEN-AI-2A
 * ============================================================================
 */

const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

const app = express();

// Middleware to parse incoming JSON request bodies
app.use(express.json());

// Path to SQLite database file (resolved reliably from current directory)
const dbPath = path.join(__dirname, "database.db");

// Database connection instance
let db = null;

// Allowed columns whitelist for ORDER BY sorting (prevents SQL injection)
const ALLOWED_ORDER_BY_COLUMNS = ["id", "title", "author", "price", "pages"];
const ALLOWED_ORDER_DIRECTIONS = ["ASC", "DESC"];

/**
 * Initialize SQLite Database connection and start the Express server
 */
const initializeDBAndServer = async (customPort) => {
  try {
    // Open SQLite database connection
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    console.log("Connected to SQLite database successfully at:", dbPath);

    // Dynamic port binding for production (Render) and local fallback
    const PORT = customPort || process.env.PORT || 3000;
    const server = app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Server is running at http://localhost:${PORT}/`);
    });
    return server;
  } catch (error) {
    console.error(`Database Initialization Error: ${error.message}`);
    process.exit(1);
  }
};

// Start initialization if executed directly
if (require.main === module) {
  initializeDBAndServer();
}

// ============================================================================
// REST API ROUTES FOR BOOKS RESOURCE
// ============================================================================

/**
 * 0. GET /
 * Root welcome route displaying API overview and available endpoints
 */
app.get("/", (request, response) => {
  response.status(200).json({
    message: "Welcome to the Books REST API – Lab 03",
    student: "Kasula Thanish (252U1R9063)",
    section: "CSE-GEN-AI-2A",
    endpoints: {
      "GET /": "This welcome message",
      "GET /books": "List all books (supports search, sort, filter, pagination)",
      "GET /books/:bookId": "Get a single book by ID",
      "POST /books": "Create a new book",
      "PUT /books/:bookId": "Update an existing book",
      "DELETE /books/:bookId": "Delete a book"
    }
  });
});

/**
 * 1. GET /books
 * Collection endpoint supporting:
 *  - search_q: Partial title search using SQL LIKE
 *  - order_by: Column to sort by (whitelisted: id, title, author, price, pages; default: id)
 *  - order: Sorting order (ASC, DESC; default: ASC)
 *  - limit: Maximum number of records to return (default: 10, max: 100)
 *  - offset: Number of records to skip (default: 0)
 *  - min_price: Filter books with price >= min_price
 *  - max_price: Filter books with price <= max_price
 */
app.get("/books", async (request, response, next) => {
  try {
    const {
      search_q,
      order_by = "id",
      order = "ASC",
      limit = "10",
      offset = "0",
      min_price,
      max_price,
    } = request.query;

    // --- A. Validate order_by whitelist ---
    const lowerOrderBy = String(order_by).toLowerCase();
    if (!ALLOWED_ORDER_BY_COLUMNS.includes(lowerOrderBy)) {
      return response.status(400).json({
        message: `Invalid order_by column '${order_by}'. Allowed columns: ${ALLOWED_ORDER_BY_COLUMNS.join(", ")}`,
      });
    }

    // --- B. Validate order direction whitelist ---
    const upperOrder = String(order).toUpperCase();
    if (!ALLOWED_ORDER_DIRECTIONS.includes(upperOrder)) {
      return response.status(400).json({
        message: `Invalid order direction '${order}'. Allowed values: ASC, DESC`,
      });
    }

    // --- C. Validate limit parameter ---
    const parsedLimit = Number(limit);
    if (!Number.isInteger(parsedLimit) || parsedLimit <= 0) {
      return response.status(400).json({
        message: "Invalid limit parameter. It must be a positive integer.",
      });
    }
    // Cap limit to a sensible maximum of 100 to prevent denial of service
    const safeLimit = Math.min(parsedLimit, 100);

    // --- D. Validate offset parameter ---
    const parsedOffset = Number(offset);
    if (!Number.isInteger(parsedOffset) || parsedOffset < 0) {
      return response.status(400).json({
        message: "Invalid offset parameter. It must be a non-negative integer.",
      });
    }

    // --- E. Validate price range parameters ---
    let parsedMin = null;
    if (min_price !== undefined) {
      parsedMin = Number(min_price);
      if (isNaN(parsedMin) || parsedMin < 0) {
        return response.status(400).json({
          message: "Invalid min_price parameter. It must be a non-negative number.",
        });
      }
    }

    let parsedMax = null;
    if (max_price !== undefined) {
      parsedMax = Number(max_price);
      if (isNaN(parsedMax) || parsedMax < 0) {
        return response.status(400).json({
          message: "Invalid max_price parameter. It must be a non-negative number.",
        });
      }
    }

    if (parsedMin !== null && parsedMax !== null && parsedMin > parsedMax) {
      return response.status(400).json({
        message: "Invalid price range: min_price cannot exceed max_price.",
      });
    }

    // --- F. Build Parameterized SQL Query ---
    const whereConditions = [];
    const queryParams = [];

    // Partial title search using SQL LIKE
    if (search_q !== undefined && search_q.trim() !== "") {
      whereConditions.push("title LIKE ?");
      queryParams.push(`%${search_q.trim()}%`);
    }

    // Minimum price filter
    if (parsedMin !== null) {
      whereConditions.push("price >= ?");
      queryParams.push(parsedMin);
    }

    // Maximum price filter
    if (parsedMax !== null) {
      whereConditions.push("price <= ?");
      queryParams.push(parsedMax);
    }

    let sqlQuery = "SELECT * FROM book";
    if (whereConditions.length > 0) {
      sqlQuery += " WHERE " + whereConditions.join(" AND ");
    }

    // Safe to interpolate validated column and direction
    sqlQuery += ` ORDER BY ${lowerOrderBy} ${upperOrder} LIMIT ? OFFSET ?;`;
    queryParams.push(safeLimit, parsedOffset);

    // Execute query with parameters
    const books = await db.all(sqlQuery, queryParams);
    return response.status(200).json(books);
  } catch (error) {
    next(error);
  }
});

/**
 * 2. GET /books/:bookId
 * Individual resource endpoint: fetch single book by its ID
 */
app.get("/books/:bookId", async (request, response, next) => {
  try {
    const { bookId } = request.params;
    const parsedId = Number(bookId);

    if (!Number.isInteger(parsedId) || parsedId <= 0) {
      return response.status(404).json({ message: "Book not found" });
    }

    const getBookQuery = "SELECT * FROM book WHERE id = ?;";
    const book = await db.get(getBookQuery, [parsedId]);

    if (!book) {
      return response.status(404).json({ message: "Book not found" });
    }

    return response.status(200).json(book);
  } catch (error) {
    next(error);
  }
});

/**
 * Helper function to validate request body for POST and PUT
 * Safely guards against undefined or non-object bodies to avoid destructuring errors
 */
const validateBookPayload = (body) => {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { valid: false, message: "Title is required" };
  }

  const { title, author, price, pages } = body;

  // Title validation
  if (title === undefined || title === null || typeof title !== "string" || title.trim() === "") {
    return { valid: false, message: "Title is required" };
  }

  // Author validation
  if (author === undefined || author === null || typeof author !== "string" || author.trim() === "") {
    return { valid: false, message: "Author is required" };
  }

  // Price existence validation
  if (price === undefined || price === null || price === "") {
    return { valid: false, message: "Price is required" };
  }

  // Price numeric type validation
  if (typeof price !== "number" || isNaN(price)) {
    return { valid: false, message: "Price must be a valid number" };
  }

  // Price non-negative validation
  if (price < 0) {
    return { valid: false, message: "Price must be a positive number" };
  }

  // Pages optional validation
  if (pages !== undefined && pages !== null && (typeof pages !== "number" || isNaN(pages) || pages < 0)) {
    return { valid: false, message: "Pages must be a non-negative number" };
  }

  return { valid: true };
};

/**
 * 3. POST /books
 * Create a new book in the database
 */
app.post("/books", async (request, response, next) => {
  try {
    const validation = validateBookPayload(request.body);
    if (!validation.valid) {
      return response.status(400).json({ message: validation.message });
    }

    const { title, author, price, pages } = request.body || {};

    const addBookQuery = `
      INSERT INTO book (title, author, price, pages)
      VALUES (?, ?, ?, ?);
    `;

    const dbResponse = await db.run(addBookQuery, [
      title.trim(),
      author.trim(),
      price,
      pages !== undefined && pages !== null ? pages : null,
    ]);

    return response.status(201).json({
      message: "Book Added Successfully",
      bookId: dbResponse.lastID,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * 4. PUT /books/:bookId
 * Update an existing book by its ID
 */
app.put("/books/:bookId", async (request, response, next) => {
  try {
    const { bookId } = request.params;
    const parsedId = Number(bookId);

    if (!Number.isInteger(parsedId) || parsedId <= 0) {
      return response.status(404).json({ message: "Book not found" });
    }

    // Verify book existence before updating
    const existingBook = await db.get("SELECT * FROM book WHERE id = ?;", [parsedId]);
    if (!existingBook) {
      return response.status(404).json({ message: "Book not found" });
    }

    const validation = validateBookPayload(request.body);
    if (!validation.valid) {
      return response.status(400).json({ message: validation.message });
    }

    const { title, author, price, pages } = request.body || {};

    const updateBookQuery = `
      UPDATE book
      SET title = ?, author = ?, price = ?, pages = ?
      WHERE id = ?;
    `;

    await db.run(updateBookQuery, [
      title.trim(),
      author.trim(),
      price,
      pages !== undefined && pages !== null ? pages : existingBook.pages,
      parsedId,
    ]);

    return response.status(200).json({ message: "Book Updated Successfully" });
  } catch (error) {
    next(error);
  }
});

/**
 * 5. DELETE /books/:bookId
 * Remove an existing book by its ID
 */
app.delete("/books/:bookId", async (request, response, next) => {
  try {
    const { bookId } = request.params;
    const parsedId = Number(bookId);

    if (!Number.isInteger(parsedId) || parsedId <= 0) {
      return response.status(404).json({ message: "Book not found" });
    }

    // Verify book existence before deleting
    const existingBook = await db.get("SELECT * FROM book WHERE id = ?;", [parsedId]);
    if (!existingBook) {
      return response.status(404).json({ message: "Book not found" });
    }

    await db.run("DELETE FROM book WHERE id = ?;", [parsedId]);

    return response.status(200).json({ message: "Book Deleted Successfully" });
  } catch (error) {
    next(error);
  }
});

// ============================================================================
// 404 UNKNOWN ROUTE HANDLER
// ============================================================================
app.use((request, response) => {
  response.status(404).json({ message: "Endpoint not found" });
});

// ============================================================================
// GLOBAL ERROR HANDLER
// ============================================================================
app.use((error, request, response, next) => {
  console.error("Unhandled Server Error:", error.message);
  response.status(500).json({ message: "Internal Server Error" });
});

module.exports = { app, initializeDBAndServer };
