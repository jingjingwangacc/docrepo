import React from 'react';

const SubmissionList = props => {
    const submissionList = [];
    for (let i = 0; i < props.submissionList.length; ++i) {
        const submission = props.submissionList[i];
        submissionList.push(
            <div className='submissionListItem'>
                <label>{submission.submissionId}</label>
                <label>{submission.authorName}</label>
                <label className='submissionListDetailShort'>{submission.creationTimestamp}</label>
                <label className='submissionListDetailShort'>{submission.submissionDescription}</label>
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
