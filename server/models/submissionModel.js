const db = require('./db');

const submissionModel = {}

// State constants
submissionModel.CREATED = "created";
submissionModel.PENDING = "pending";
submissionModel.SUBMITTED = "submitted";

// Create a new in-memory object respresening a submission. Each key corresponds
// to a column in the submissions table. Such object can be used to insert new
// submissions to the database.
//
// Note: The returned submission is not yet written to database, and does not
// have a valid submissionId. Caller shall then set the necessary information
// in the object, and call insertNewSubmission().
//
// Also, calling get...() methods to fetch submission(s) from database will also
// return such object(s).
submissionModel.newSubmissionObject = () => {
    return {
        submissionId: -1,
        submissionState: submissionModel.CREATED,
        authorId: -1,
        reviewerIds: [],
        approvedReviewerIds: [],
        projectName: "",
        clientName: "",
        submissionDescription: "",
        creationTimestamp: new Date().toISOString(),
        deadline: null,
        submissionTimestamp: null,
        fileIds: [],
        commentIds: []
    };
}

// Insert a new submission to the database. The submission object should be
// generated from newSubmissionObject(). This will automatically fill in the
// creationTimestamp & submissionId fields. Upon succeed, it will update the
// creationTimestamp and submissionId fields of the object.
submissionModel.insertNewSubmission = async (submission) => {
    submission.creationTimestamp = new Date().toISOString();
    console.log("To insert: ", submission);
    const queryString = `
        INSERT INTO submissions
            (submission_state, author_id, reviewer_ids, approved_reviewer_ids,
            project_name, client_name, submission_description,
            creation_timestamp, deadline, submission_timestamp, file_ids, comment_ids)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        RETURNING submission_id AS "submissionId"`;
    params = [submission.submissionState, submission.authorId,
    submission.reviewerIds, submission.approvedReviewerIds,
    submission.projectName, submission.clientName,
    submission.submissionDescription, submission.creationTimestamp,
    submission.deadline, submission.submissionTimestamp, submission.fileIds,
    submission.commentIds];

    const result = await db.query(queryString, params);
    submission.submissionId = result.rows[0].submissionId;
}

// Update a submission row (whose Id is submission.submissionId) to match the
// the current value of the submission object.
submissionModel.updateSubmission = async (submission) => {
    submission.creationTimestamp = new Date().toISOString();
    console.log("To update: ", submission);
    const queryString = `
        UPDATE submissions
        SET
            submission_state = $1,
            author_id = $2,
            reviewer_ids = $3,
            approved_reviewer_ids = $4,
            project_name = $5,
            client_name = $6,
            submission_description = $7,
            creation_timestamp = $8,
            deadline = $9,
            submission_timestamp = $10,
            file_ids = $11,
            comment_ids = $12
        WHERE submission_id = $13`;
    params = [submission.submissionState, submission.authorId,
    submission.reviewerIds, submission.approvedReviewerIds,
    submission.projectName, submission.clientName,
    submission.submissionDescription, submission.creationTimestamp,
    submission.deadline, submission.submissionTimestamp, submission.fileIds,
    submission.commentIds, submission.submissionId];

    const result = await db.query(queryString, params);
}

// Fetch a given submission by its unique Id. Return an array with 0 or 1 row.
submissionModel.getSubmissionById = async (submissionId) => {
    const queryString =
        `SELECT
            submission_id AS "submissionId",
            submission_state AS "submissionState",
            author_id AS "authorId",
            reviewer_ids AS "reviewerIds",
            approved_reviewer_ids AS "approvedReviewerIds",
            project_name AS "projectName",
            client_name AS "clientName",
            submission_description AS "submissionDescription",
            creation_timestamp AS "creationTimestamp",
            deadline,
            submission_timestamp AS "submissionTimestamp",
            file_ids AS "fileIds",
            comment_ids AS "commentIds"
        FROM submissions
        WHERE submissions.submission_id = $1`;
    const params = [submissionId];
    const results = await db.query(queryString, params);
    return results.rows;
}

// Fetch submissions authored by a given user from the database.
submissionModel.getSubmissionByAuthor = async (authorId, numResults = 10) => {
    const queryString = `
        SELECT 
            submission_id AS "submissionId",
            submission_state AS "submissionState",
            author_id AS "authorId",
            reviewer_ids AS "reviewerIds",
            approved_reviewer_ids AS "approvedReviewerIds",
            project_name AS "projectName",
            client_name AS "clientName",
            submission_description AS "submissionDescription",
            creation_timestamp AS "creationTimestamp",
            deadline,
            submission_timestamp AS "submissionTimestamp",
            file_ids AS "fileIds",
            comment_ids AS "commentIds"
        FROM submissions
        WHERE
            submissions.author_id = $1
        ORDER BY creation_timestamp DESC
        LIMIT $2`;
    const params = [authorId, numResults];
    const results = await db.query(queryString, params);
    return results.rows;
}

// Fetch submissions authored by a given user and in a certain state from the database.
submissionModel.getSubmissionByAuthorAndState = async (authorId, state = PENDING, numResults = 10) => {
    const queryString = `
        SELECT
            submission_id AS "submissionId",
            submission_state AS "submissionState",
            author_id AS "authorId",
            reviewer_ids AS "reviewerIds",
            approved_reviewer_ids AS "approvedReviewerIds",
            project_name AS "projectName",
            client_name AS "clientName",
            submission_description AS "submissionDescription",
            creation_timestamp AS "creationTimestamp",
            deadline,
            submission_timestamp AS "submissionTimestamp",
            file_ids AS "fileIds",
            comment_ids AS "commentIds"
        FROM submissions
        WHERE
            submissions.author_id = $1 AND
            submissions.state = $2";
        ORDER BY creation_timestamp DESC
        LIMIT $3`;
    const params = [authorId, state, numResults];
    const results = await db.query(queryString, params);
    return results.rows;
}

// Fetch submissions with a given reviewer from the database.
// If notReviewedOnly = true, only return submissions that the
// user hasn't reviewed yet.
submissionModel.getSubmissionByReviewer = async (reviewerId, notReviewedOnly = false, numResults = 10) => {
    let additionalCondition = "";
    if (notReviewedOnly) {
        additionalCondition = "AND $1 != ANY (submissions.approved_reviewer_ids";
    }
    const queryString = `
        SELECT 
            submission_id AS "submissionId",
            submission_state AS "submissionState",
            author_id AS "authorId",
            reviewer_ids AS "reviewerIds",
            approved_reviewer_ids AS "approvedReviewerIds",
            project_name AS "projectName",
            client_name AS "clientName",
            submission_description AS "submissionDescription",
            creation_timestamp AS "creationTimestamp",
            deadline,
            submission_timestamp AS "submissionTimestamp",
            file_ids AS "fileIds",
            comment_ids AS "commentIds"
        FROM submissions
        WHERE
            $1 = ANY (submissions.reviewer_ids)
        `
        + additionalCondition +
        `
        ORDER BY creation_timestamp DESC
        LIMIT $2
        `;
    const params = [reviewerId, numResults];
    const results = await db.query(queryString, params);
    return results.rows;
}

module.exports = submissionModel;
