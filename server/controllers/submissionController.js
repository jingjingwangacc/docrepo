const submissionModel = require('../models/submissionModel.js');

const submissionController = {};

submissionController.createSubmission = async (req, res, next) => {
    console.log("Create submission with the following params: ", req.body);
    try {
        // Create a new submission object.
        const submission = submissionModel.newSubmissionObject();

        // Set submission information.
        submission.author_id = req.body.userId;
        submission.submission_description = req.body.description;
        submission.reviewer_ids = req.body.reviewerIds;

        // Insert it into the database.
        await submissionModel.insertNewSubmission(submission);
        res.locals.submission = submission;

        return next();
    }
    catch (err) {
        return next({
            log: 'Failed to create new submission' + err,
            mesaage: { err: 'Failed to create new submission.' }
        });
    }
};

module.exports = submissionController;
