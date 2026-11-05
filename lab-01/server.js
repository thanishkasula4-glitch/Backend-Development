
const express = require("express");

const app = express();
const PORT = 3000;

// GET / - Home route
app.get("/", (request, response) => {
    response.status(200).send("Welcome to my Lab 1 server!");
});


// GET /about - Return student name and section
app.get("/about", (request, response) => {
    response.status(200).json({
        name: "Thanisha Kasula",
        section: "CSE-A"
    });
});
// GET /time - Current date and time
app.get("/time", (request, response) => {
    response.status(200).json({
        currentDateTime: new Date()
    });
});

// Handle unknown routes
app.use((request, response) => {
    response.status(404).send("404 - Page Not Found");
});

// Start the Express server
app.listen(PORT, () => {
    console.log(`Express server running at http://localhost:${PORT}`);
});
