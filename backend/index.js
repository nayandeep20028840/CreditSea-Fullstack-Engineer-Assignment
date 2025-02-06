const express = require('express');
const cors = require('cors');
const xmlRoutes = require('./routes/xmlRoutes.js');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Setting up the PORT
const PORT = process.env.PORT || 3000;

// Middleware to handle JSON or form-data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS for all domains (allowing any origin)
app.use(cors());

// Serve static files (frontend) from the 'dist' directory
app.use(express.static(path.join(__dirname, 'dist')));

// API Routes for file uploads and fetching data
app.use('/api/files', xmlRoutes);

// Define a default route (fixes "Cannot GET /" error)
app.get("/", (req, res) => {
    res.send("Server is running!!!...");
});

// Catch-all for frontend routes (serve index.html for all routes that don’t match an API route)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    if (err.message) {
        res.status(400).send(err.message);
    } else {
        res.status(500).send('Internal Server Error');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});





// const express = require('express');
// const cors = require('cors');
// const xmlRoutes = require('./routes/xmlRoutes.js');
// const dotenv = require('dotenv');

// // Load environment variables
// dotenv.config();

// const app = express();

// // Setting up the PORT
// const PORT = process.env.PORT || 3000;

// // Middleware to handle JSON or form-data
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Enable CORS for all routes
// app.use(cors());

// // Define a default route (fixes "Cannot GET /" error)
// app.get("/", (req, res) => {
//     res.send("Server is running!!!...");
// });

// // Use file upload routes
// app.use('/api/files', xmlRoutes);

// // Error handling middleware
// app.use((err, req, res, next) => {
//     if (err.message) {
//         res.status(400).send(err.message);
//     } else {
//         res.status(500).send('Internal Server Error');
//     }
// });

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });
