const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Ensure 'uploads' directory exists
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/xml' || file.mimetype === 'text/xml') {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only XML files are allowed.'));
    }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
