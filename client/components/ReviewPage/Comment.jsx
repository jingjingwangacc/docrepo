import React from 'react';

const Comment = props => {
  return (
    <div>
      <h2>Comments</h2>
      <div className='reviewAddComment'>
        <textarea className='reviewAddCommentTextArea' rows={8} placeholder="New comment"
          onChange={(e) => { props.handleSetNewComment(e); }}
          value={props.newComment}>
        </textarea>
        <button class='reviewAddCommentButton'
          onClick={() => { props.handleAddNewComment(); }}>
          Add Comment
        </button>
      </div>
    </div >
  );
};

export default Comment;
