import React from 'react';
import SubmissionList from './SubmissionList.jsx'

const OutgoingReadySubmission = props => {
    return (
        <div className='labelAndSubmissionList'>
            <div className="submissionListLabel">Outgoing Submissions: Ready to Submit</div>
            <SubmissionList submissionList={props.submissionList} />
        </div>
    );
};

export default OutgoingReadySubmission;
