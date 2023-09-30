import React from 'react';
import SubmissionList from './SubmissionList.jsx'

const IncomingSubmission = props => {
    return (
        <div className='labelAndSubmissionList'>
            <div className="submissionListLabel">Incoming Submissions to Review</div>
            <SubmissionList submissionList={props.submissionList} />
        </div>
    );
};

export default IncomingSubmission;
