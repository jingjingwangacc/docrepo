const db = require('./db');

const commentModel = {}

// Create a new in-memory object respresening a comment. Each key corresponds to
// a column in the comments table. Such object can be used to insert new comment
// to the database.
//
// Note: The returned comment object is not yet written to database, and does
// not have a valid commentId. Caller shall then set the necessary information
// in the object, and call insertNewComment().
//
// Also, calling get...() methods to fetch comment(s) from database will also
// return such object(s).
commentModel.newCommentObject = () => {
    return {
        commentId: -1,
        commenterId: -1,
        creationTimestamp: "",
        comment: "",
        resolved: false,
    }
}

// Upon success, this method will fill in the creaetionTimestamp and commentId.
commentModel.insertNewComment = async (comment) => {
    comment.creationTimestamp = new Date().toISOString();
    console.log("To insert: ", comment);
    const queryString = `
        INSERT INTO comments (commenter_id, creation_timestamp, comment, resolved) VALUES ($1, $2, $3, $4)
        RETURNING comment_id AS "commentId"`;
    params = [comment.commenterId, comment.creationTimestamp, comment.comment, comment.resolved];

    const result = await db.query(queryString, params);
    comment.commentId = result.rows[0].commentId;
}

// Get comment by the Id. Return null if not found.
commentModel.getCommentById = async (commentIds) => {
    const commentList = [];
    for (let i = 0; i < commentIds.length; i++) {
        const queryString =
            `SELECT
                comment_id AS "commentId",
                commenter_id AS "commenterId",
                creation_timestamp AS "creationTimestamp",
                comment,
                resolved
            FROM comments WHERE comments.comment_id = $1`;
        const params = [commentIds[i]];
        const results = await db.query(queryString, params);
        console.log("To query comment: ", params[0], "got: ", results.rows);
        if (results.rows.length === 0) {
            return null;
        } else {
            commentList.push(results.rows[0]);
        }
    }
    return commentList;
}

module.exports = commentModel;
