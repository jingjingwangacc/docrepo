import React from 'react';
import { useHistory } from "react-router-dom";

const SubmissionList = props => {
    const submissionList = [];
    const history = useHistory();
    for (let i = 0; i < props.submissionList.length; ++i) {
        const submission = props.submissionList[i];
        submissionList.push(
            <div className='submissionListItem' onClick={() => { history.push('/review/' + submission.submissionId) }}>
                <div className='submissionListIdCell'>
                    {/* <a href={'/review' + subminssion.submissionId}>{submission.submissionId}</a> */}
                    {submission.submissionId}
                </div>
                <div className='submissionListAuthorCell'>
                    {submission.authorName}
                </div>
                <div className='submissionListProjectCell'>
                    {submission.projectName}
                </div>
                <div className='submissionListDescriptionCell'>
                    {submission.submissionDescription}
                </div>
            </div>
        );
    }

    return (
        <div className='submissionList'>
            <div className='submissionListHeader'>
                <label className='submissionListIdCell'>Submission Id</label>
                <label className='submissionListAuthorCell'>Author</label>
                <label className='submissionListProjectCell'>Project</label>
                <label className='submissionListDescriptionCell'>Description</label>
            </div>
            {submissionList}
        </div>
    );
};

export default SubmissionList;
