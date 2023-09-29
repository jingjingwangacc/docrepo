const submissionModel = require('../models/submissionModel.js');
const userModel = require('../models/userModel.js');
const fileModel = require('../models/fileModel.js');
const commentModel = require('../models/commentModel.js');

// A helper function to retrieve all user names in a submission.
// This includes author name, reviewer names, and commenter names.
// Return true if successful, false if not.
const retrieveUserNames = async (submission) => {
    // Retrieve author's name, reviewers' names, and commenter's names.
    const userIds = [submission.authorId]
    for (let i = 0; i < submission.reviewerIds.length; ++i) {
        userIds.push(submission.reviewerIds[i]);
    }
    if (submission.commentList) {
        for (let i = 0; i < submission.commentList.length; ++i) {
            userIds.push(submission.commentList[i].commenter_id);
        }
    }
    const userIdToName = await userModel.getUserNameByIds(userIds);
    console.log("Map: ", userIdToName);

    // Assign author name.
    if (!(submission.authorId in userIdToName)) {
        return false;
    }
    submission.authorName = userIdToName[submission.authorId];

    // Assign reviewer names.
    submission.reviewerNames = [];
    for (let i = 0; i < submission.reviewerIds.length; ++i) {
        let reviewerId = submission.reviewerIds[i];
        if (!(reviewerId in userIdToName)) {
            return false;
        }
        submission.reviewerNames.push(userIdToName[reviewerId]);
    }

    // Assign approved reviewer names.
    submission.approvedReviewerNames = [];
    for (let i = 0; i < submission.approvedReviewerIds.length; ++i) {
        let reviewerId = submission.approvedReviewerIds[i];
        if (!(reviewerId in userIdToName)) {
            return false;
        }
        submission.approvedReviewerNames.push(userIdToName[reviewerId]);
    }

    // Assign commenter names.
    if (submission.commentList) {
        for (let i = 0; i < submission.commentList.length; ++i) {
            let commenterId = submission.commentList[i].commenterId;
            if (!(commenterId in userIdToName)) {
                return false;
            }
            submission.commentList[i].commenterName = userIdToName[commenterId];
        }
    }
    return true;
}

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

        if (!await retrieveUserNames(submission)) {
            return next({
                log: "Cannot find user name(s) in the submission.",
                message: { err: 'Error while getting submission.' }
            });
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

// List submissions from a given author.
// This only retrieves the basic information from submission table, plus the
// author name and reviewer names. It won't fill in file / comment details.
submissionController.listSubmissionsByAuthor = async (req, res, next) => {
    const authorId = req.params.userId;
    const pendingOnly = false;
    if (req.body.pendingOnly) {
        pendingOnly = true;
    }
    const numResults = 20;
    if (req.body.numResults > 0) {
        numResults = req.body.numResults;
    }
    console.log("Get submission authored by Id: ", authorId);
    console.log("pendingOnly = ", pendingOnly);
    console.log("numResults = ", numResults);
    try {
        let submissions = [];
        if (pendingOnly) {
            submissions = await submissionModel.getSubmissionByAuthorAndState(authorId, submissionModel.PENDING, numResults);
        } else {
            submissions = await submissionModel.getSubmissionByAuthor(authorId, numResults);
        }
        for (let i = 0; i < submissions.length; ++i) {
            if (!await retrieveUserNames(submissions[i])) {
                return next({
                    log: 'Failed to get user names in submission ' + submissions[i].submissionId,
                    mesaage: { err: 'Failed to get submissions by author.' }
                });
            }
        }
        res.locals.submissionsByAuthor = submissions;
        return next();
    } catch (err) {
        return next({
            log: 'Failed to get submission by author ' + authorId + ': ' + err,
            mesaage: { err: 'Failed to get submissions by author.' }
        });
    }
}

// List submissions with a given reviewer
// This only retrieves the basic information from submission table, plus the
// author name and reviewer names. It won't fill in file / comment details.
submissionController.listSubmissionsByReviewer = async (req, res, next) => {
    const reviewerId = req.params.userId;
    const pendingOnly = false;
    if (req.body.pendingOnly) {
        pendingOnly = true;
    }
    const numResults = 20;
    if (req.body.numResults > 0) {
        numResults = req.body.numResults;
    }
    console.log("Get submission by reviewer: ", reviewerId);
    console.log("pendingOnly = ", pendingOnly);
    console.log("numResults = ", numResults);
    try {
        let submissions = await submissionModel.getSubmissionByReviewer(reviewerId, pendingOnly, numResults);
        for (let i = 0; i < submissions.length; ++i) {
            if (!await retrieveUserNames(submissions[i])) {
                return next({
                    log: 'Failed to get user names in submission ' + submissions[i].submissionId,
                    mesaage: { err: 'Failed to get submissions by reviewer.' }
                });
            }
        }
        res.locals.submissionsByReviewer = submissions;
        return next();
    } catch (err) {
        return next({
            log: 'Failed to get submission by reviewer ' + reviewerId + ': ' + err,
            mesaage: { err: 'Failed to get submissions by reviewer.' }
        });
    }
}

module.exports = submissionController;
