# Backend Development Fundamentals – Coursework

- **Student Name:** Kasula Thanish
- **Registration Number:** 252U1R9063
- **Section:** CSE-GEN-AI-2A
- **Course:** Backend Development Fundamentals
- **Repository:** [Backend-Development](https://github.com/thanishkasula4-glitch/Backend-Development)

---

## Laboratory Assignments

This repository contains the complete coursework for **Backend Development Fundamentals**, structured into modular lab projects:

### 📁 [Lab Report 1 – Node.js and Express Server](./lab%20report%201/)
A foundational backend project demonstrating native Node.js HTTP server creation and Express.js routing, JSON serialization, dynamic datetime handling, and custom 404 middleware.

- **Directory:** [`lab report 1/`](./lab%20report%201/)
- **Live Deployment URL:** [https://backend-development-utrs.onrender.com/](https://backend-development-utrs.onrender.com/)
- **Key Files:** `server.js`, `server-http.js`, `package.json`, `README.md`
- **Screenshots:** [`lab report 1/screenshots/`](./lab%20report%201/screenshots/)
  - `home.png` – GET `/` (200 OK)
  - `about.png` – GET `/about` (200 OK)
  - `time.png` – GET `/time` (200 OK)
  - `404.png` – GET `/unknown` (404 Not Found)

---

### 📁 [Lab Report 2 – SQLite Database and CRUD Routes](./lab%20report%202/)
A full RESTful API implementation performing complete CRUD (Create, Read, Update, Delete) operations on an embedded SQLite database (`database.db`) using Express.js and the `sqlite3` driver.

- **Directory:** [`lab report 2/`](./lab%20report%202/)
- **Live Deployment URL:** [https://lab-report-2-s043.onrender.com/books/](https://lab-report-2-s043.onrender.com/books/)
- **Key Files:** `app.js`, `database.db`, `initDB.sql`, `package.json`, `README.md`
- **Screenshots:** [`lab report 2/screenshots/`](./lab%20report%202/screenshots/)
  - `database-verification.png` – Initial SQLite schema and seed verification
  - `get-all-books.png` – GET `/books/` (200 OK)
  - `get-book-by-id.png` – GET `/books/:bookId/` (200 OK)
  - `post-add-book.png` – POST `/books/` (201 Created)
  - `put-update-book.png` – PUT `/books/:bookId/` (200 OK)
  - `delete-book.png` – DELETE `/books/:bookId/` (200 OK)

---

## Laboratory Index

| Lab Number | Lab Title | Status |
|---|---|---|
| Lab 1 | Node.js and Express Server | Completed |
| Lab 2 | SQLite Database and CRUD Routes | Completed |
| Lab 3 | To be added | Pending |
| Lab 4 | To be added | Pending |
| Lab 5 | To be added | Pending |
| Lab 6 | To be added | Pending |
| Lab 7 | To be added | Pending |
| Lab 8 | To be added | Pending |
| Lab 9 | To be added | Pending |
| Lab 10 | To be added | Pending |

---

## Project Structure Overview

```text
Backend-Development/
│
├── lab report 1/                        # Lab 1: Node.js & Express Server
│   ├── screenshots/
│   │   ├── home.png
│   │   ├── about.png
│   │   ├── time.png
│   │   └── 404.png
│   ├── .gitignore
│   ├── README.md
│   ├── server.js
│   ├── server-http.js
│   ├── package.json
│   └── package-lock.json
│
├── lab report 2/                        # Lab 2: SQLite Database & CRUD Routes
│   ├── screenshots/
│   │   ├── database-verification.png
│   │   ├── delete-book.png
│   │   ├── get-all-books.png
│   │   ├── get-book-by-id.png
│   │   ├── post-add-book.png
│   │   └── put-update-book.png
│   ├── .gitignore
│   ├── README.md
│   ├── app.js
│   ├── database.db
│   ├── initDB.sql
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore
└── README.md                            # Main Coursework Hub
```
