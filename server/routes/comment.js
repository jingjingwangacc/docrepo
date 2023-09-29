const express = require('express');

const commentController = require('../controllers/commentController.js');
const submissionController = require('../controllers/submissionController.js');

const router = express.Router();

router.post('/',
    commentController.addComment,
    // To call submissionController.getSubmission, we need submissoin Id in
    // req.params.submissionId. But when posting a new comment, submission Id
    // is in req.body. So we copy it to req.params.
    (req, res, next) => {
        req.params.submissionId = req.body.submissionId;
        return next();
    },
    submissionController.getSubmission,
    submissionController.addCommentIdToSubmission,
    (req, res) => res.status(200).json(
        {
            submission: res.locals.submission,
            comment: res.locals.comment
        })
);

module.exports = router;
