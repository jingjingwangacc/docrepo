const commentModel = require('../models/commentModel.js');
const commentController = {};

commentController.handleAddComment = async (req, res, next) => {
    console.log("Handle add comment: ", req.body);
   try {
    // Create a new comment object.
    const comment = commentModel.newCommentObject();

    // Set comment information.
    comment.commenterId = req.body.userId;
    comment.comment = req.body.comment;
    comment.resolved = req.body.resolved;

    // Insert it into the database.
    await commentModel.insertNewComment(comment);
    res.locals.comment = comment;

    return next();
} catch (err) {
    return next({
        log: 'Failed to add a new comment' + err,
        mesaage: { err: 'Failed to add a new comment.' }
    });
}
};

module.exports = commentController;
