const express = require('express');

const fileController = require('../controllers/fileController.js');

const router = express.Router();

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/',
    upload.single('file'),
    fileController.handleUpload,
    (req, res) => res.status(200).json({ fileId: res.locals.file.fileId })
);

module.exports = router;
