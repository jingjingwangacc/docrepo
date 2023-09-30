import React from 'react';
import { useHistory } from "react-router-dom";

const SubmissionList = props => {
    const submissionList = [];
    const history = useHistory();
    for (let i = 0; i < props.submissionList.length; ++i) {
        const submission = props.submissionList[i];
        submissionList.push(
            <div className='submissionListItem'>
                <div className='submissionListIdCell'>
                    <a className='submissionListItemLink' href={"/review/" + submission.submissionId}>
                        {submission.submissionId}
                    </a>
                </div>
                <div className='submissionListAuthorCell'>
                    <a className='submissionListItemLink' href={"/review/" + submission.submissionId}>
                        {submission.authorName}
                    </a>
                </div>
                <div className='submissionListProjectCell'>
                    <a className='submissionListItemLink' href={"/review/" + submission.submissionId}>
                        {submission.projectName}
                    </a>
                </div>
                <div className='submissionListDescriptionCell'>
                    <a className='submissionListItemLink' href={"/review/" + submission.submissionId}>
                        {submission.submissionDescription}
                    </a>
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
