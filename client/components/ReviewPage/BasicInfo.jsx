import React from 'react';

const BasicInfo = props => {
  return (
    <div className='reviewBasicInfo'>
      <h3>Submission {props.submissionId} from {props.authorName} </h3>
    </div>
  );
};

export default BasicInfo;
