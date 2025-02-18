

const express = require('express');
const cors = require('cors');
const xmlRoutes = require('./routes/xmlRoutes.js');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Setting up the PORT
const PORT = process.env.PORT || 3000;

// Allow only the specified frontend URL
const allowedOrigin = "https://credit-sea-fullstack-engineer-assignment.vercel.app";

app.use(
    cors({
        origin: '*', // Change this to allowedOrigin to restrict access
        methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed methods if needed
        credentials: true, // If sending cookies or authentication headers
    })
);

// Middleware to handle JSON or form-data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS for all routes
app.use(cors());

// Define a default route (fixes "Cannot GET /" error)
app.get("/", (req, res) => {
    res.send("Server is running!!!...");
});

// Use file upload routes
app.use('/api/files', xmlRoutes);

// // Error handling middleware
// app.use((err, req, res, next) => {
//     if (err.message) {
//         res.status(400).send(err.message);
//     } else {
//         res.status(500).send('Internal Server Error');
//     }
// });

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
