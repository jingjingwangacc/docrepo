import React from 'react';
import SubmissionList from './SubmissionList.jsx'

const OutgoingPendingSubmission = props => {
    return (
        <div className='outgoingPendingSubmissionList'>
            <h2>Outgoing Submissions: Pending Review</h2>
            <SubmissionList submissionList={props.submissionList} />
        </div>
    );
};

export default OutgoingPendingSubmission;
