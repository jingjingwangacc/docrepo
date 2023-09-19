const db = require('./db');

const submissionModel = {}

// State constants
submissionModel.CREATED = "created";
submissionModel.PENDING = "pending";
submissionModel.SUBMITTED = "submitted";

// Create a new in-memory object respresening a submission. Each key is a
// column in the submissions table. This format of this object is same as the
// returned submission row from DB.
// Note: The returned submission is not yet written to database, and does not
// have a valid submission_id. Caller shall then set the necessary information
// in the object, and call insertNewSubmission().
submissionModel.newSubmissionObject = () => {
    return {
        submission_id: -1,
        submission_state: submissionModel.CREATED,
        author_id: -1,
        reviewer_ids: [],
        approved_reviewer_ids: [],
        submission_description: "",
        creation_timestamp: null,
        submission_timestamp: null,
        files: null,
        comments: []
    };
}

// Insert a new submission to the database. The submission object should be
// generated from newSubmissionObject(). This will automatically fill in the
// creation_timestamp & submission_id fields . Upon succeed, it will update
// the creation_timestamp and submission_id fields on the object.
submissionModel.insertNewSubmission = async (submission) => {
    submission.creation_timestamp = new Date().toISOString();
    console.log("To insert: ", submission);
    const queryString = `
        INSERT INTO submissions
            (submission_state, author_id, reviewer_ids, approved_reviewer_ids,
            submission_description, creation_timestamp, submission_timestamp,
            files, comments)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING submission_id`;
    params = [submission.submission_state, submission.author_id,
    submission.reviewer_ids, submission.approved_reviewer_ids,
    submission.submission_description, submission.creation_timestamp,
    submission.submission_timestamp, submission.files, submission.comments];

    const result = await db.query(queryString, params);
    submission.submission_id = result.rows[0].submission_id;
}

// Fetch a given submission by its unique Id. Return an array with 0 or 1 row.
submissionModel.getSubmissionById = async (submissionId) => {
    const queryString =
        `SELECT * FROM submissions WHERE submissions.submission_id = $1`;
    const params = [submissionId];
    const results = await db.query(queryString, params);
    return results.rows;
}

// Fetch submissions authored by a given user from the database.
submissionModel.getSubmissionByAuthor = async (authorId, numResults = 10) => {
    const queryString = `
        SELECT * FROM submissions
        WHERE
            submissions.author_id = $1
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
            submissions.author_id = $1 AND
            submissions.state = $2";
        ORDER BY creation_timestamp DESC
        LIMIT $3`;
    const params = { authorId, state, numResults };
    const results = await db.query(queryString, params);
    return results.rows;
}

module.exports = submissionModel;