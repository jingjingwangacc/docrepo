import React from 'react';

const Reviewer = props => {
    const reviewerList = [];
    for (let i = 0; i < props.reviewerList.length; i++) {
        reviewerList.push((<div><label>{props.reviewerList[i]}</label></div>));
    }
    return (
        <div className='reviewReviewerInfo'>
            <h2>Reviewers:</h2>
            <div>
                {reviewerList}
            </div>
        </div >
    );
};

export default Reviewer;
