import React from 'react';

const Reviewer = props => {
    const reviewerList = [];
    for (let i = 0; i < props.reviewerList.length; i++) {
        reviewerList.push(
            <div className='submitReviewer'>
                <label className='reviewerName'>{props.reviewerList[i]}</label>
                <button className='removeButton' onClick={() => props.handleDeleteReviewer(i)}>X</button>
            </div>);
    }
    return (
        <div className='submitComponent'>
            <div className='submitTitle'>
                <label className='submitTitleLabel'>Reviewers:</label>
            </div>
            <div className='labeledInput'>
                <input className='submitInput' onChange={(e) => props.handleChangeReviewer(e)} value={props.newReviewer}></input>
                <button className='inputButton' onClick={() => props.handleAddReviewer()}>add</button>
            </div>
            <div className='submitReviewerList'>
                {reviewerList}
            </div>

        </div >
    );
};

export default Reviewer;
