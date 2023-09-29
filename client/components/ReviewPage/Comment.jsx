import React from 'react';

const Comment = props => {
  const commentList = [];
  for (let i = 0; i < props.commentList.length; ++i) {
    commentList.push(
      <div className='reviewOneComment'>
        <h3>Comment {i + 1} from {props.commentList[i].commenterName}: </h3>
        <div className='reviewOneCommentText'>
          {props.commentList[i].comment}
        </div>
        <h3>Posted on: {props.commentList[i].creationTimestamp}</h3>
      </div>
    )
  }

  return (
    <div className='reviewComment'>
      <h2>Comments</h2>
      <div className='reviewCommentList'>
        {commentList}
      </div>
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
    </div>
  );
};

export default Comment;
