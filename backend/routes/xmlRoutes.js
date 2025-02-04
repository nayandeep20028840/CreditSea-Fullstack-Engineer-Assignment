const express = require('express');
const { uploadReport, getReport } = require('../controllers/xmlController');
const fileUpload = require('../middlewares/uploadMiddleware');

const router = express.Router();

// POST route to upload XML file
router.post('/upload', fileUpload.single('file'), uploadReport);

module.exports = router;
