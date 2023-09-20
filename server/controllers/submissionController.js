const submissionModel = require('../models/submissionModel.js');
const userModel = require('../models/userModel.js');

const submissionController = {};

submissionController.createSubmission = async (req, res, next) => {
    console.log("Create submission with the following params: ", req.body);
    try {
        // Create a new submission object.
        const submission = submissionModel.newSubmissionObject();

        // Set submission information.
        submission.author_id = req.body.userId;
        submission.submission_description = req.body.description;
        if (req.body.reviewerIds) {
            submission.reviewer_ids = req.body.reviewerIds;
        } else {
            submission.reviewer_ids = [];
        }

        // Insert it into the database.
        await submissionModel.insertNewSubmission(submission);
        res.locals.submission = submission;

        return next();
    } catch (err) {
        return next({
            log: 'Failed to create new submission' + err,
            mesaage: { err: 'Failed to create new submission.' }
        });
    }
};

submissionController.getSubmission = async (req, res, next) => {
    const submissionId = req.params.submissionId;
    console.log("Get submission with Id: ", submissionId);
    try {
        // Retrieve submission object from database.
        const submissions = await submissionModel.getSubmissionById(submissionId);
        if (submissions.length === 0) {
            return next({
                log: 'Submission Id not found: ' + submissionId,
                message: { err: 'Submission Id not found: ' + submissionId }
            });
        }
        const submission = submissions[0];
        console.log("Submission: ", submission);

        // Retrieve author's name, and reviewers' names.
        const userIds = [submission.author_id]
        for (let i = 0; i < submission.reviewer_ids.length; ++i) {
            userIds.push(submission.reviewer_ids[i]);
        }
        const userIdToName = await userModel.getUserNameByIds(userIds);
        console.log("Map: ", userIdToName);

        // Assign author name.
        if (!(submission.author_id in userIdToName)) {
            return next({
                log: "Cannot find author Id: " + submission.author_id,
                message: { err: 'Error while getting submission.' }
            });
        }
        submission.author_name = userIdToName[submission.author_id];
        
        // Assign reviewer names.
        submission.reviewer_names = [];
        for (let i = 0; i < submission.reviewer_ids.length; ++i) {
            let reviewerId = submission.reviewer_ids[i];
            if (!(reviewerId in userIdToName)) {
                return next({
                    log: "Cannot find reviewer Id: " + reviewerId,
                    message: { err: 'Error while getting submission.' }
                });
            }
            submission.reviewer_names.push(userIdToName[reviewerId]);
        }

        // Assign approved reviewer names.
        submission.approved_reviewer_names = [];
        for (let i = 0; i < submission.approved_reviewer_ids.length; ++i) {
            let reviewerId = submission.approved_reviewer_ids[i];
            if (!(reviewerId in userIdToName)) {
                return next({
                    log: "Cannot find reviewer Id: " + reviewerId,
                    message: { err: 'Error while getting submission.' }
                });
            }
            submission.approved_reviewer_names.push(userIdToName[reviewerId]);
        }

        res.locals.submission = submission;
        return next();
    } catch (err) {
        return next({
            log: 'Failed to get submission by Id ' + submissionId + ': ' + err,
            mesaage: { err: 'Failed to get submission.' }
        });
    }
};

module.exports = submissionController;
