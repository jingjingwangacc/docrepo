const submissionModel = require('../models/submissionModel.js');
const userModel = require('../models/userModel.js');
const fileModel = require('../models/fileModel.js');
const commentModel = require('../models/commentModel.js');

const submissionController = {};

submissionController.createSubmission = async (req, res, next) => {
    console.log("Create submission with the following params: ", req.body);
    try {
        // Create a new submission object.
        const submission = submissionModel.newSubmissionObject();
        let fileIds = [];
        for (let i = 0; i < req.body.fileList.length; i++) {
            fileIds.push(req.body.fileList[i].fileId);
        }
        // Set submission information.
        submission.authorId = req.body.userId;
        submission.projectName = req.body.projectName;
        submission.clientName = req.body.clientName;
        submission.submissionDescription = req.body.submissionDescription;
        submission.deadline = req.body.deadline;
        submission.reviewerIds = await userModel.getUserIdByName(req.body.reviewerNameList);
        submission.fileIds = fileIds;

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

        // Retrieve comments.
        const comments = await commentModel.getCommentById(submission.commentIds);
        submission.commentList = comments;

        // Retrieve author's name, reviewers' names, and commenter's names.
        const userIds = [submission.authorId]
        for (let i = 0; i < submission.reviewerIds.length; ++i) {
            userIds.push(submission.reviewerIds[i]);
        }
        for (let i = 0; i < submission.commentList.length; ++i) {
            userIds.push(submission.commentList[i].commenter_id);
        }
        const userIdToName = await userModel.getUserNameByIds(userIds);
        console.log("Map: ", userIdToName);

        // Assign author name.
        if (!(submission.authorId in userIdToName)) {
            return next({
                log: "Cannot find author Id: " + submission.authorId,
                message: { err: 'Error while getting submission.' }
            });
        }
        submission.authorName = userIdToName[submission.authorId];
        
        // Assign reviewer names.
        submission.reviewerNames = [];
        for (let i = 0; i < submission.reviewerIds.length; ++i) {
            let reviewerId = submission.reviewerIds[i];
            if (!(reviewerId in userIdToName)) {
                return next({
                    log: "Cannot find reviewer Id: " + reviewerId,
                    message: { err: 'Error while getting submission.' }
                });
            }
            submission.reviewerNames.push(userIdToName[reviewerId]);
        }

        // Assign approved reviewer names.
        submission.approvedReviewerNames = [];
        for (let i = 0; i < submission.approvedReviewerIds.length; ++i) {
            let reviewerId = submission.approvedReviewerIds[i];
            if (!(reviewerId in userIdToName)) {
                return next({
                    log: "Cannot find reviewer Id: " + reviewerId,
                    message: { err: 'Error while getting submission.' }
                });
            }
            submission.approvedReviewerNames.push(userIdToName[reviewerId]);
        }

        // Assign commenter names.
        for (let i = 0; i < submission.commentList.length; ++i) {
            let commenterId = submission.commentList[i].commenterId;
            if (!(commenterId in userIdToName)) {
                return next({
                    log: "Cannot find commenter Id: " + commenterId,
                    message: { err: 'Error while getting submission.' }
                });
            }
            submission.commentList[i].commenterName = userIdToName[commenterId];
        }

        // Get file info, such as pending file paths.
        const fileList = await fileModel.getFileById(submission.fileIds);
        submission.fileList = fileList;
        console.log("Fully populated submission = ", submission);

        res.locals.submission = submission;
        return next();
    } catch (err) {
        return next({
            log: 'Failed to get submission by Id ' + submissionId + ': ' + err,
            mesaage: { err: 'Failed to get submission.' }
        });
    }
};

submissionController.addCommentIdToSubmission = async (req, res, next) => {
    if (!res.locals.submission || !res.locals.comment) {
        return next({
            log: 'addCommentIdToSubmission() needs res.locals.submission and res.locals.comment.',
            message: { err: 'Error adding comment to submission.' }
        })
    }
    const submission = res.locals.submission;
    const comment = res.locals.comment;

    try {
        submission.commentIds.push(comment.commentId);
        submissionModel.updateSubmission(submission);
        return next();
    } catch (err) {
        return next({
            log: 'Failed to add comment to submission: ' + err,
            mesaage: { err: 'Error adding comment to submission.' }
        });
    }
}

module.exports = submissionController;
