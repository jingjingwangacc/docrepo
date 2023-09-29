import React from 'react';

const Comment = props => {
  return (
    <div>
      <h2>Comments</h2>
      <div className='reviewAddComment'>
        <div className='reviewAddCommentTextAreaDiv'>
          <textarea className='reviewAddCommentTextArea' rows={8} placeholder="New comment"
            onChange={(e) => { props.handleSetNewComment(e); }}
            value={props.newComment}>
          </textarea>
        </div>
        <button class='reviewAddCommentButton'
          onClick={() => { props.handleAddNewComment(); }}>
          Add Comment
        </button>
      </div>
    </div >
  );
};

export default Comment;
