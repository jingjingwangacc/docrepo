import React from 'react';
import SubmissionList from './SubmissionList.jsx'

const IncomingSubmission = props => {
    return (
        <div className='incomingSubmissionList'>
            <h2>Incoming Submissions to Review</h2>
            <SubmissionList submissionList={props.submissionList} />
        </div>
    );
};

export default IncomingSubmission;
