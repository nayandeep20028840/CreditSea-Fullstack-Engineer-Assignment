const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const fileFilter = (req, file, cb) => {
    // console.log('File:', file); // correct file object
    if (file.mimetype === 'application/xml' || file.mimetype === 'text/xml') {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only XML files are allowed.'));
    }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
