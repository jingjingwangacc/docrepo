const db = require('./db');

const submissionModel = {}

// State constants
submissionModel.CREATED = "created";
submissionModel.PENDING = "pending";
submissionModel.SUBMITTED = "submitted";

// Create a new in-memory object respresening a submission.
// The submission is not yet written to database, and does not have a valid submission_id.
// Caller shall then set the necessary information in the object, and call insertNewSubmission().
submissionModel.newSubmissionObject = (author_id) => {
    return {
        submission_id: -1,
        submission_state: submissionModel.CREATED,
        author_id: author_id,
        reviewer_ids: [],
        approved_reviewer_ids: [],
        submission_description: "New submission",
        creation_timestamp: new Date().toISOString(),
        submission_timestamp: null,
        files: null,
        comments: []
    };
}

// Insert a new submission to the database.
// The submission object should be generated from newSubmissionObject().
// Upon succeed, it will update the submission_id on the object.
submissionModel.insertNewSubmission = async (submission) => {
    console.log("To insert: ", submission);
    const queryString = `
        INSERT INTO submissions
            (submission_state, author_id, reviewer_ids, approved_reviewer_ids,
            submission_description, creation_timestamp, submission_timestamp,
            files, comments)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING submission_id`;
    params = [submission.submission_state, submission.author_id, submission.reviewer_ids,
    submission.approved_reviewer_ids, submission.submission_description,
    submission.creation_timestamp, submission.submission_timestamp, submission.files,
    submission.comments];

    const result = await db.query(queryString, params);
    submission.submission_id = result.rows[0].submission_id;
}

// Fetch submissions authroed by a given user from the database.
submissionModel.getSubmissionByAuthor = async (authorId, numResults = 10) => {
    const queryString = `
        SELECT * FROM submissions
        WHERE
            submission.submissions.author_id = $1
        ORDER BY creation_timestamp DESC
        LIMIT $2`;
    const params = { authorId, numResults };
    const results = await db.query(queryString, params);
    return results.rows;
}

// Fetch submissions authored by a given user and in a certain state from the database.
submissionModel.getSubmissionByAuthorAndState = async (authorId, state = PENDING, numResults = 10) => {
    const queryString = `
        SELECT * FROM submissions
        WHERE
            submission.submissions.author_id = $1 AND
            submission.state = $2";
        ORDER BY creation_timestamp DESC
        LIMIT $3`;
    const params = { authorId, state, numResults };
    const results = await db.query(queryString, params);
    return results.rows;
}

module.exports = submissionModel;
