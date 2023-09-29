const express = require('express');

const commentController = require('../controllers/commentController.js');

const router = express.Router();

router.post('/',
    commentController.handleAddComment,
    (req, res) => res.status(200).json(res.locals.comment)
);

module.exports = router;
