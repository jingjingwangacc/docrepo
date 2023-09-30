import React from 'react';
import SubmissionList from './SubmissionList.jsx'

const OutgoingPendingSubmission = props => {
    return (
        <div className='labelAndSubmissionList'>
            <div className="submissionListLabel">Outgoing Submissions: Pending Review</div>
            <SubmissionList submissionList={props.submissionList} />
        </div>
    );
};

export default OutgoingPendingSubmission;
