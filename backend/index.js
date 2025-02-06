const express = require('express');
const cors = require('cors');
const xmlRoutes = require('./routes/xmlRoutes.js');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Setting up the PORT
const PORT = process.env.PORT || 3000;

// Middleware to handle JSON or form-data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS for all routes
app.use(cors());

// Define a default route (fixes "Cannot GET /" error)
app.get("/", (req, res) => {
    res.send("Server is running!");
});

// Use file upload routes
app.use('/api/files', xmlRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    if (err.message) {
        res.status(400).send(err.message);
    } else {
        res.status(500).send('Internal Server Error');
    }
});

// Start server (except in test environment)
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}

// Corrected module.exports
module.exports = app;
