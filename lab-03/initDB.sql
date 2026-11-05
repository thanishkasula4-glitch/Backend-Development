-- Schema Definition for Lab 3 Books API
CREATE TABLE IF NOT EXISTS book (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    price INTEGER NOT NULL,
    pages INTEGER
);

-- Seed Data
INSERT INTO book (id, title, author, price, pages) VALUES
(1, 'To Kill a Mockingbird', 'Harper Lee', 350, 281),
(2, '1984', 'George Orwell', 299, 328),
(3, 'The Great Gatsby', 'F. Scott Fitzgerald', 250, 180),
(4, 'Pride and Prejudice', 'Jane Austen', 199, 279),
(5, 'The Catcher in the Rye', 'J.D. Salinger', 320, 234),
(6, 'The Hobbit', 'J.R.R. Tolkien', 450, 310),
(7, 'Fahrenheit 451', 'Ray Bradbury', 280, 249),
(8, 'The Alchemist', 'Paulo Coelho', 220, 208),
(9, 'Brave New World', 'Aldous Huxley', 310, 268),
(10, 'Clean Code (Second Edition)', 'Robert C. Martin', 500, 500);