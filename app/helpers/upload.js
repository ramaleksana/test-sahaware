const multer = require('multer');

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '.' + file.originalname.split('.').pop());
    }
})

let accepted = [
    'image/png',
    'image/jpg',
    'image/jpeg',
]

const upload = multer({
    storage: storage,
    limits: { fileSize: 5000000 },
    fileFilter: (req, file, cb) => {
        if (accepted.indexOf(file.mimetype) == -1) {
            // cb(null, false);
            cb(new Error('Please upload a Image'), false)
        } else {
            cb(null, true);
        }

    },

});

module.exports = upload;
