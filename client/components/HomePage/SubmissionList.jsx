import React from 'react';
import { useHistory } from "react-router-dom";

const SubmissionList = props => {
    const submissionList = [];
    const history = useHistory();
    for (let i = 0; i < props.submissionList.length; ++i) {
        const submission = props.submissionList[i];
        submissionList.push(
            <div className='submissionListItem'>
                <a className='submissionListItemLink'
                    href={"/review/" + submission.submissionId}>
                    <label>{submission.submissionId}</label>
                    <label>{submission.authorName}</label>
                    <label className='submissionListDetailShort'>{submission.projectName}</label>
                    <label className='submissionListDetailShort'>{submission.submissionDescription}</label>
                </a>
            </div>
        );
    }

    return (
        <div className='submissionList'>
            <div className='submissionListHeader'>
                <label>Submission Id</label>
                <label>Author</label>
                <label>Project</label>
                <label>Description</label>
            </div>
            {submissionList}
        </div>
    );
};

export default SubmissionList;
