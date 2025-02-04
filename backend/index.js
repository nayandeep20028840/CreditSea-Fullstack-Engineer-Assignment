const express = require('express');
const xmlRoutes = require('./routes/xmlRoutes.js');
const app = express();
const port = 3000;

// Middleware to handle JSON or form-data (useful for debugging)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
