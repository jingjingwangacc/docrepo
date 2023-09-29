import React from 'react';
import SubmissionList from './SubmissionList.jsx'

const OutgoingReadySubmission = props => {
    return (
        <div className='outgoingReadySubmissionList'>
            <h2>Outgoing Submissions: Ready to Submit</h2>
            <SubmissionList submissionList={props.submissionList} />
        </div>
    );
};

export default OutgoingReadySubmission;
