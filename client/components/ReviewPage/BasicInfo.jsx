import React from 'react';

const BasicInfo = props => {
  return (
    <div>
      <h2>Submission's Basic Info</h2>
      <div>
        <label>Submission Id: </label>
        <span>{props.submissionId}</span>
      </div>
      <div>
        <label>Author: </label>
        <span>{props.authorName}</span>
      </div>
    </div >
  );
};

export default BasicInfo;
