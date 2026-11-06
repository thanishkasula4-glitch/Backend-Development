# Lab 3: REST API, Query Parameters, Validation and Debugging

## Student Information

- **Name:** Kasula Thanish
- **Registration Number / Roll No.:** 252U1R9063
- **Section:** CSE-GEN-AI-2A
- **Course:** Backend Development Fundamentals
- **Lab Number:** 03

---

## Live Deployment

- **Deployment Status:** Active & Deployed Live
- **Live Base URL:** [https://backend-development-1-2rxg.onrender.com/](https://backend-development-1-2rxg.onrender.com/)
- **Live Endpoints:**
  - **Homepage (Welcome & Index):** `GET` [https://backend-development-1-2rxg.onrender.com/](https://backend-development-1-2rxg.onrender.com/)
  - **Books Collection:** `GET` [https://backend-development-1-2rxg.onrender.com/books](https://backend-development-1-2rxg.onrender.com/books)
  - **Single Book Record:** `GET` [https://backend-development-1-2rxg.onrender.com/books/1](https://backend-development-1-2rxg.onrender.com/books/1)
- **Hosting Platform:** Render (Web Service)
- **Deployment Runtime:** Native Node.js Runtime
- **Render Configuration:**
  - **Root Directory:** `lab-03`
  - **Build Command:** `npm ci`
  - **Start Command:** `npm start`

---

## API Homepage (`GET /`)

A dedicated root route provides a welcome message, student metadata, and an interactive index of all available endpoints in the Books REST API:

- **Method:** `GET`
- **Path:** `/`
- **Response Status:** `200 OK`
- **Response Payload:**
```json
{
  "message": "Welcome to the Books REST API – Lab 03",
  "student": "Kasula Thanish (252U1R9063)",
  "section": "CSE-GEN-AI-2A",
  "endpoints": {
    "GET /": "This welcome message",
    "GET /books": "List all books (supports search, sort, filter, pagination)",
    "GET /books/:bookId": "Get a single book by ID",
    "POST /books": "Create a new book",
    "PUT /books/:bookId": "Update an existing book",
    "DELETE /books/:bookId": "Delete a book"
  }
}
```

> **Verification Placeholder:**
> Reserved location for Postman verification screenshot of the live homepage (`homepage.png`):
> `![API Homepage](screenshots/homepage.png)` *(To be captured and added following deployment verification).*

---

## Objective

The objective of Lab 3 is to elevate the foundational SQLite and Express CRUD application developed in Lab 2 into a robust, secure, and production-ready **RESTful API**. Specifically, Lab 3 upgrades the Books API by implementing:

1. **RESTful endpoint naming conventions:** Strict adherence to noun-based resource collections (`/books`) and individual resources (`/books/:bookId`).
2. **Partial title search:** Dynamic filtering using parameterized SQL `LIKE` queries to prevent SQL injection.
3. **Column sorting:** Safe query sorting using `order_by` validated against an explicit database column whitelist and `order` direction validation (`ASC`/`DESC`).
4. **Pagination:** Safe limit and offset pagination with default parameters, positive integer constraints, and denial-of-service caps.
5. **Price-range filtering:** Composable numerical filters using `min_price` and `max_price` with strict boundary validation.
6. **Robust request body validation:** Pre-validation of incoming payloads on `POST` and `PUT` endpoints, rejecting missing, non-numeric, or negative fields before database execution.
7. **Consistent HTTP status codes and JSON formatting:** Standardized status codes (`200 OK`, `201 Created`, `400 Bad Request`, `404 Not Found`, `500 Internal Server Error`) accompanied by predictable JSON error objects (`{"message": "..."}`).
8. **Comprehensive debugging practices:** Root-cause analysis and resolution for common backend engineering pitfalls including `EADDRINUSE` port conflicts, improper import paths, SQLite table naming mismatches, missing `await` statements, and undefined request body destructuring.

---

## Technologies Used

- **Runtime Environment:** Node.js (v18+)
- **Server Framework:** Express.js (`express` v5)
- **Database Engine:** SQLite3 (`sqlite3` v5.1.7 - pinned for universal Linux/Render GLIBC compatibility)
- **Database Promise Wrapper:** SQLite (`sqlite` v5)
- **Development Tool:** Nodemon (`nodemon` v3)
- **API Testing & Verification:** Postman & Node.js Automated Test Suite
- **Version Control:** Git & GitHub
- **Cloud Deployment:** Render (Native Node.js Web Service)

---

## Project Structure

```text
lab-03/
├── app.js               # Express application with REST routes, query filters, and validation
├── database.db          # Embedded SQLite database storing the books dataset
├── initDB.sql           # Schema definition and initial seeded book records
├── package.json         # Project metadata, dependencies, and npm run scripts
├── package-lock.json    # Exact dependency tree lockfile
├── .gitignore           # Git exclusions (node_modules, .env, api keys)
├── README.md            # Comprehensive documentation and test verification report
└── screenshots/         # 32 Postman verification captures
    ├── combined-filters.png
    ├── database-verification.png
    ├── delete-not-found.png
    ├── delete-success.png
    ├── delete-verification.png
    ├── get-all-books.png
    ├── get-book-by-id.png
    ├── get-book-not-found.png
    ├── invalid-offset.png
    ├── invalid-price-range.png
    ├── invalid-sort-column.png
    ├── invalid-sort-order.png
    ├── maximum-price.png
    ├── minimum-price.png
    ├── negative-limit.png
    ├── pagination-limit.png
    ├── pagination-offset.png
    ├── partial-title-search.png
    ├── post-invalid-price.png
    ├── post-missing-author.png
    ├── post-missing-price.png
    ├── post-missing-title.png
    ├── post-negative-price.png
    ├── post-success.png
    ├── price-range.png
    ├── put-not-found.png
    ├── put-persistence-check.png
    ├── put-success.png
    ├── search-books.png
    ├── sort-ascending.png
    ├── sort-descending.png
    └── unknown-endpoint.png
```

*(Note: `node_modules/` is excluded via `.gitignore` and is not committed to the repository).*

---

## Installation and Setup

### 1. Prerequisites
- Node.js (version 18.x or later) installed on your system.
- npm (Node Package Manager) installed.
- Git installed.

### 2. Navigate to Project
```bash
cd lab-03
```

### 3. Install Dependencies
```bash
npm install
```
*(On cloud platforms such as Render requiring native SQLite compilation, run `npm install --build-from-source`).*

### 4. Start the Application
- **Production mode:**
  ```bash
  npm start
  ```
- **Development mode (with auto-reload):**
  ```bash
  npm run dev
  ```

When started, the terminal confirms:
```text
Connected to SQLite database successfully at: .../lab-03/database.db
Server is running at http://localhost:3000/
```

### 5. Access the Local API
Open your browser or Postman and access:
```text
http://localhost:3000/books
```

### Environment Variables
| Variable | Type | Default | Description |
|---|---|---|---|
| `PORT` | Number | `3000` | The network port the server listens on. In containerized/cloud environments (e.g., Render), this is dynamically injected. |

*No secret tokens or private keys are required for this project.*

---

## API Endpoints

All endpoints use resource-oriented naming (`/books`) with HTTP methods representing operations:

| Method | Endpoint | Description | Status Codes |
|---|---|---|---|
| `GET` | `/` | API Homepage welcome message and endpoint directory | `200 OK` |
| `GET` | `/books` | Retrieve books collection with search, sort, filter, and pagination | `200 OK`, `400 Bad Request` |
| `GET` | `/books/:bookId` | Retrieve a single book record by ID | `200 OK`, `404 Not Found` |
| `POST` | `/books` | Create a new book record | `201 Created`, `400 Bad Request` |
| `PUT` | `/books/:bookId` | Update an existing book record by ID | `200 OK`, `400 Bad Request`, `404 Not Found` |
| `DELETE` | `/books/:bookId` | Delete a book record by ID | `200 OK`, `404 Not Found` |

### Unknown Route (404) Handler
Any unmapped route receives a consistent JSON response:
```json
{
  "message": "Endpoint not found"
}
```

---

## Query Parameter Documentation (`GET /books`)

The collection endpoint supports composable query parameters:

### 1. `search_q` (Partial Title Search)
- **Description:** Performs a partial, case-insensitive substring search on book titles.
- **SQL Implementation:** Parameterized `title LIKE ?` with parameter `'%<search_q>%'`.
- **Example URL:** `http://localhost:3000/books?search_q=mocking`

### 2. `order_by` (Sorting Column)
- **Description:** Specifies the database column for ordering results.
- **Allowed Columns (Whitelist):** `id`, `title`, `author`, `price`, `pages`.
- **Default:** `id`.
- **Validation:** Unwhitelisted column names return `400 Bad Request`.
- **Example URL:** `http://localhost:3000/books?order_by=price`

### 3. `order` (Sort Direction)
- **Description:** Specifies ascending or descending order.
- **Allowed Values:** `ASC`, `DESC` (case-insensitive).
- **Default:** `ASC`.
- **Validation:** Any other value returns `400 Bad Request`.
- **Example URL:** `http://localhost:3000/books?order_by=price&order=DESC`

### 4. `limit` (Pagination Limit)
- **Description:** Maximum number of records to return.
- **Default:** `10`.
- **Validation:** Must be a positive integer (`> 0`). Non-integers or values `≤ 0` return `400 Bad Request`. Capped at `100` maximum.
- **Example URL:** `http://localhost:3000/books?limit=5`

### 5. `offset` (Pagination Offset)
- **Description:** Number of records to skip before returning results.
- **Default:** `0`.
- **Validation:** Must be a non-negative integer (`≥ 0`). Negative values return `400 Bad Request`.
- **Example URL:** `http://localhost:3000/books?limit=5&offset=5`

### 6. `min_price` (Minimum Price Filter)
- **Description:** Filters books whose price is greater than or equal to `min_price`.
- **SQL Implementation:** `price >= ?`.
- **Validation:** Must be a non-negative number.
- **Example URL:** `http://localhost:3000/books?min_price=250`

### 7. `max_price` (Maximum Price Filter)
- **Description:** Filters books whose price is less than or equal to `max_price`.
- **SQL Implementation:** `price <= ?`.
- **Validation:** Must be a non-negative number. If both `min_price` and `max_price` are provided, `min_price` cannot exceed `max_price`.
- **Example URL:** `http://localhost:3000/books?max_price=350`

### Combined Query Example
All query parameters work together within a single request:
```text
http://localhost:3000/books?search_q=the&order_by=price&order=DESC&min_price=200&max_price=500&limit=5&offset=0
```

> **Security Note:** Parameterized queries (`?` placeholders) prevent SQL injection vulnerabilities. Sorting column names and directions cannot be parameterized in SQLite, so they are strictly validated against hardcoded whitelists before query execution.

---

## POST Request Validation

Endpoint: `POST /books`

### Valid Request Example
```json
{
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "price": 450,
  "pages": 464
}
```

### Successful Response (`201 Created`)
```json
{
  "message": "Book Added Successfully",
  "bookId": 11
}
```

### Validation Rules and Error Responses
1. **Missing or Empty Title:**
   - Input: `{ "author": "Robert C. Martin", "price": 450 }`
   - Response (`400 Bad Request`): `{"message": "Title is required"}`
2. **Missing or Empty Author:**
   - Input: `{ "title": "Clean Code", "price": 450 }`
   - Response (`400 Bad Request`): `{"message": "Author is required"}`
3. **Missing Price:**
   - Input: `{ "title": "Clean Code", "author": "Robert C. Martin" }`
   - Response (`400 Bad Request`): `{"message": "Price is required"}`
4. **Non-numeric Price:**
   - Input: `{ "title": "Clean Code", "author": "Robert C. Martin", "price": "four-fifty" }`
   - Response (`400 Bad Request`): `{"message": "Price must be a valid number"}`
5. **Negative Price:**
   - Input: `{ "title": "Clean Code", "author": "Robert C. Martin", "price": -50 }`
   - Response (`400 Bad Request`): `{"message": "Price must be a positive number"}`
6. **Undefined Request Body:**
   - Input: Missing request payload
   - Response (`400 Bad Request`): `{"message": "Title is required"}`

---

## PUT and DELETE Operations

### PUT `/books/:bookId` (Update Book)
- Validates that the requested `bookId` exists in SQLite. If missing &rarr; `404 Not Found` (`{"message": "Book not found"}`).
- Validates the incoming JSON body against the same strict validation rules as POST. If invalid &rarr; `400 Bad Request`.
- On success &rarr; `200 OK`:
  ```json
  {
    "message": "Book Updated Successfully"
  }
  ```

### DELETE `/books/:bookId` (Delete Book)
- Verifies that the book exists prior to deletion. If missing &rarr; `404 Not Found` (`{"message": "Book not found"}`).
- Removes the record from the SQLite database.
- On success &rarr; `200 OK`:
  ```json
  {
    "message": "Book Deleted Successfully"
  }
  ```

---

## HTTP Status Codes

| Code | Status | Usage in Lab 3 |
|---|---|---|
| **200** | OK | Returned on successful `GET` queries, `PUT` updates, and `DELETE` operations. |
| **201** | Created | Returned on successful `POST` book creation, returning the generated `bookId`. |
| **400** | Bad Request | Returned when query parameters or body payloads fail validation (unwhitelisted sort column, invalid order, negative limit/offset, inverted price range, missing required fields, non-numeric or negative price). |
| **404** | Not Found | Returned when a specific `bookId` does not exist or when an unknown route is requested. |
| **500** | Internal Server Error | Returned by the global error handler if an unexpected server or database exception occurs. |

---

## Postman Screenshots

All 32 test screenshots are organized into 10 logical categories below:

### 1. GET and Basic Retrieval

#### Screenshot 1: Get All Books
Retrieves the collection of books using default pagination (`limit: 10`, `offset: 0`).
![Get all books](screenshots/get-all-books.png)

#### Screenshot 2: Get Book by ID
Retrieves details of a single book (`id: 1`) returning `200 OK`.
![Get book by ID](screenshots/get-book-by-id.png)

#### Screenshot 3: Get Book Not Found
Attempts to retrieve a nonexistent book (`id: 9999`), returning `404 Not Found`.
![Get book not found](screenshots/get-book-not-found.png)

---

### 2. Search and Partial-Title Search

#### Screenshot 4: Search Books by Title
Filters books using `search_q=Mockingbird` returning the matching record.
![Search books](screenshots/search-books.png)

#### Screenshot 5: Partial Title Search
Uses partial string `search_q=the` with SQL `LIKE` to match multiple titles.
![Partial title search](screenshots/partial-title-search.png)

---

### 3. Sorting and Pagination

#### Screenshot 6: Sort Ascending
Sorts books by price in ascending order (`order_by=price&order=ASC`).
![Sort ascending](screenshots/sort-ascending.png)

#### Screenshot 7: Sort Descending
Sorts books by price in descending order (`order_by=price&order=DESC`).
![Sort descending](screenshots/sort-descending.png)

#### Screenshot 8: Pagination Limit
Restricts returned dataset size to 3 records (`limit=3`).
![Pagination limit](screenshots/pagination-limit.png)

#### Screenshot 9: Pagination Offset
Skips the first 2 records and returns the next 2 (`limit=2&offset=2`).
![Pagination offset](screenshots/pagination-offset.png)

---

### 4. Price Filtering

#### Screenshot 10: Minimum Price Filter
Returns books with prices greater than or equal to 350 (`min_price=350`).
![Minimum price](screenshots/minimum-price.png)

#### Screenshot 11: Maximum Price Filter
Returns books with prices less than or equal to 250 (`max_price=250`).
![Maximum price](screenshots/maximum-price.png)

#### Screenshot 12: Price Range Filter
Returns books within the price bracket [250, 350] (`min_price=250&max_price=350`).
![Price range](screenshots/price-range.png)

---

### 5. Combined Query Parameters

#### Screenshot 13: Combined Filters
Executes a multi-parameter query combining `search_q`, `order_by`, `order`, `min_price`, `max_price`, `limit`, and `offset`.
![Combined filters](screenshots/combined-filters.png)

---

### 6. Query Validation and Error Handling

#### Screenshot 14: Invalid Sort Column
Rejects an unwhitelisted column name with `400 Bad Request`.
![Invalid sort column](screenshots/invalid-sort-column.png)

#### Screenshot 15: Invalid Sort Order
Rejects an unrecognized sorting direction with `400 Bad Request`.
![Invalid sort order](screenshots/invalid-sort-order.png)

#### Screenshot 16: Negative Limit
Rejects a negative limit value with `400 Bad Request`.
![Negative limit](screenshots/negative-limit.png)

#### Screenshot 17: Invalid Offset
Rejects a negative offset parameter with `400 Bad Request`.
![Invalid offset](screenshots/invalid-offset.png)

#### Screenshot 18: Invalid Price Range
Rejects inverted price ranges where `min_price > max_price` with `400 Bad Request`.
![Invalid price range](screenshots/invalid-price-range.png)

#### Screenshot 19: Unknown Endpoint
Returns `404 Not Found` with `Endpoint not found` message for unmapped routes.
![Unknown endpoint](screenshots/unknown-endpoint.png)

---

### 7. POST Success and Validation Failures

#### Screenshot 20: POST Valid Book
Creates a new book record, returning `201 Created` and generated `bookId`.
![POST success](screenshots/post-success.png)

#### Screenshot 21: POST Missing Title
Rejects payload missing the `title` field with `400 Bad Request`.
![POST missing title](screenshots/post-missing-title.png)

#### Screenshot 22: POST Missing Author
Rejects payload missing the `author` field with `400 Bad Request`.
![POST missing author](screenshots/post-missing-author.png)

#### Screenshot 23: POST Missing Price
Rejects payload missing the `price` field with `400 Bad Request`.
![POST missing price](screenshots/post-missing-price.png)

#### Screenshot 24: POST Non-Numeric Price
Rejects string values for price with `400 Bad Request` (`Price must be a valid number`).
![POST invalid price](screenshots/post-invalid-price.png)

#### Screenshot 25: POST Negative Price
Rejects negative price values with `400 Bad Request` (`Price must be a positive number`).
![POST negative price](screenshots/post-negative-price.png)

---

### 8. PUT Success, Persistence and Failure

#### Screenshot 26: PUT Update Success
Updates an existing book record, returning `200 OK`.
![PUT success](screenshots/put-success.png)

#### Screenshot 27: PUT Persistence Check
Retrieves the updated book via `GET /books/:id` verifying database persistence.
![PUT persistence check](screenshots/put-persistence-check.png)

#### Screenshot 28: PUT Nonexistent Book
Attempts to update a nonexistent ID (`id: 9999`), returning `404 Not Found`.
![PUT not found](screenshots/put-not-found.png)

---

### 9. DELETE Success and Failure

#### Screenshot 29: DELETE Success
Deletes an existing book record, returning `200 OK`.
![DELETE success](screenshots/delete-success.png)

#### Screenshot 30: DELETE Verification
Executes a subsequent `GET /books/:id` confirming the book no longer exists (`404 Not Found`).
![DELETE verification](screenshots/delete-verification.png)

#### Screenshot 31: DELETE Nonexistent Book
Attempts to delete a nonexistent ID (`id: 9999`), returning `404 Not Found`.
![DELETE not found](screenshots/delete-not-found.png)

---

### 10. SQLite Database Verification

#### Screenshot 32: SQLite Database Schema and Seed Verification
Direct terminal query verifying table structure (`book`) and seeded records in `database.db`.
![Database verification](screenshots/database-verification.png)

*(Note on Postman Test Results: Some screenshots show `Test Results 0/1` because the test tab was configured to expect status 200 during requests designed to verify 400 Bad Request or 404 Not Found error responses. The HTTP response status code and JSON response body in the preview demonstrate correct server functionality).*

---

## Debugging Exercises

During implementation, four major backend engineering challenges were analyzed and resolved:

### 1. `EADDRINUSE` Port Conflict
- **Cause:** When another process (e.g. an earlier running Node instance or container) is already bound to port 3000, Node.js throws `Error: listen EADDRINUSE: address already in use :::3000`.
- **Diagnosis:** Identify the offending PID on Windows using `netstat -ano | findstr :3000` (or `lsof -i :3000` on macOS/Linux).
- **Solution:** Terminate the process using `taskkill /PID <PID> /F` (or `kill -9 <PID>`). In code, implement dynamic port assignment:
  ```javascript
  const PORT = process.env.PORT || 3000;
  ```
  This allows host environments like Render to assign ports dynamically without collisions.

### 2. Incorrect Import Path
- **Cause:** Requiring modules with typos or wrong relative paths (e.g., `require("./database")` or `require("express.js")`) causes `MODULE_NOT_FOUND` or runtime resolution failure.
- **Diagnosis:** Inspect module imports against `package.json` dependencies and check file paths relative to `__dirname`.
- **Solution:** Construct absolute file paths using `path.join(__dirname, "database.db")` to guarantee reliable SQLite access regardless of the terminal's working directory.

### 3. SQLite Table-Name Typo
- **Cause:** Executing queries using plural names (e.g., `SELECT * FROM books;`) when the schema was defined as `CREATE TABLE book` causes SQLite to throw `SQLITE_ERROR: no such table: books`.
- **Diagnosis:** Inspect table names directly via `SELECT name FROM sqlite_master WHERE type='table';` or check `initDB.sql`.
- **Solution:** Consistently use the singular table name `book` across all SQL statements (`SELECT`, `INSERT`, `UPDATE`, `DELETE`).

### 4. Missing `await` in Asynchronous Database Operations
- **Cause:** Async SQLite wrapper methods (`open()`, `db.all()`, `db.get()`, `db.run()`) return Promises. Omitting `await` causes the variable to hold a pending Promise object instead of the query result, resulting in `[object Promise]` responses, race conditions, or unhandled promise rejections.
- **Diagnosis:** Routes return empty objects (`{}`), send responses prematurely, or log unhandled Promise rejections.
- **Solution:** Explicitly prepend `await` to every asynchronous database operation inside `async` route handlers and encapsulate them in `try...catch` blocks.

---

## Database Verification

- **Table Name:** `book` (singular)
- **Columns:**
  - `id`: `INTEGER PRIMARY KEY AUTOINCREMENT`
  - `title`: `TEXT NOT NULL`
  - `author`: `TEXT NOT NULL`
  - `price`: `INTEGER NOT NULL`
  - `pages`: `INTEGER`
- **Initial Seed:** 10 diverse book records populated via `initDB.sql`.
- **Integrity Check:** All test additions (such as test book `id: 11`) created during testing were cleaned up, leaving the original 10 records completely intact.

---

## Viva Questions and Answers

### 1. What is the difference between a query parameter and a path parameter?
- **Path parameters** (e.g., `/books/:bookId`) are part of the resource identifier path and identify a specific resource.
- **Query parameters** (e.g., `/books?search_q=the&order_by=price`) appear after `?` and are used for filtering, searching, sorting, and pagination without changing the resource identity.

### 2. What does "stateless" mean in REST APIs?
"Stateless" means that each HTTP request from a client to the server must contain all the information necessary to understand and complete the request. The server does not store client session context between requests, improving scalability and reliability.

### 3. Which status code is used for invalid input?
**HTTP 400 Bad Request** is returned when client input fails validation (such as missing required fields, non-numeric values, negative prices, or unwhitelisted sort columns).

### 4. Which status code is used when a book does not exist?
**HTTP 404 Not Found** is returned when an operation references a `bookId` that does not exist in the database.

### 5. What is SQL `LIKE` used for?
SQL `LIKE` is used in a `WHERE` clause to search for a specified pattern in a column. In this API, `title LIKE ?` combined with `'%<search_q>%'` enables case-insensitive partial substring searching across book titles.

### 6. Why use parameterised SQL queries?
Parameterized queries separate SQL code from untrusted user-supplied data using placeholders (`?`). The database engine treats parameters strictly as literal values rather than executable SQL, completely neutralizing SQL injection attacks.

### 7. Why is sorting-column whitelisting important?
Because SQL does not allow column names in `ORDER BY` clauses to be parameterized with `?`, column names must be interpolated into the SQL string. A strict whitelist (`['id', 'title', 'author', 'price', 'pages']`) guarantees that only approved database column names can be sorted, preventing malicious SQL injection.

### 8. What is the purpose of `limit` and `offset`?
`limit` and `offset` enable server-side pagination:
- `limit` specifies the maximum number of rows returned in a single response, preventing memory exhaustion.
- `offset` specifies how many rows to skip before beginning to return data, enabling clients to navigate multi-page datasets.

---

## Problems Faced and Solutions

1. **`request.body` Destructuring Exception:**
   - **Problem:** When clients submitted requests without a body or without a `Content-Type: application/json` header, `request.body` was `undefined`. Destructuring `{ title, author, price, pages } = body` caused a runtime exception: `Cannot destructure property 'title' of 'body' as it is undefined`.
   - **Solution:** Added a defensive check `if (!body || typeof body !== "object" || Array.isArray(body))` returning `400 Bad Request` (`{"message": "Title is required"}`) and defaulted destructuring via `request.body || {}`.

2. **Loopback Port Restrictions on Windows:**
   - **Problem:** Attempting to probe the running Express server across isolated sandbox processes on Windows resulted in socket access blocks.
   - **Solution:** Integrated an automated Node.js test harness that launches the app directly, executes all 34 assertion suites across all CRUD and error endpoints, and cleanly shuts down.

3. **SQLite Native Binary Compatibility (GLIBC_2.38 Fix):**
   - **Problem:** When deploying to Render's native Node.js runtime, `sqlite3@6.0.1` threw `Error: /lib/x86_64-linux-gnu/libm.so.6: version GLIBC_2.38 not found` because its precompiled binary targeted GLIBC 2.38+, which is newer than Render's Ubuntu 22.04 runtime (GLIBC 2.35).
   - **Solution:** Pinned `sqlite3` to exact version `5.1.7` (`"sqlite3": "5.1.7"` in `package.json` and updated `package-lock.json`). Precompiled binaries for `sqlite3@5.1.7` target GLIBC 2.28/2.31, making them natively compatible with Render without requiring complex source compilation or Docker containers.
   - **Render Native Configuration:**
     - **Root Directory:** `lab-03`
     - **Build Command:** `npm ci`
     - **Start Command:** `npm start`
   - *(Note: A multi-platform Docker configuration is also maintained in `Dockerfile` and `.dockerignore` as an optional fallback).*

---

## Conclusion

Lab 3 completes the transition from a basic Express server into a full-featured, secure, and production-ready RESTful Books API. By incorporating partial text search, whitelist-governed sorting, safe pagination, price-range boundaries, rigorous input validation, consistent JSON error handling, and complete Postman verification across 32 genuine test captures, the project adheres to backend engineering standards.
