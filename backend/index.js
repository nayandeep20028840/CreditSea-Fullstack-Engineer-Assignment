const express = require('express');
const cors = require('cors'); // Import cors here
const xmlRoutes = require('./routes/xmlRoutes.js');
const app = express();
const port = 3000;

// Middleware to handle JSON or form-data (useful for debugging)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS for all routes
app.use(cors());

// Use file upload routes (Note: your routes will be under /api/files)
app.use('/api/files', xmlRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    if (err.message) {
        res.status(400).send(err.message);
    } else {
        res.status(500).send('Internal Server Error');
    }
});

// Do not call app.listen() if the environment is 'test'
if (process.env.NODE_ENV !== 'test') {
    const port = 3000;
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = app;  // Export the app for testing
