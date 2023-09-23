import React from 'react';

const Reviewer = props => {
    const reviewerList = [];
    for (let i = 0; i < props.reviewerList.length; i++) {
        reviewerList.push((<div>
            <label>{props.reviewerList[i]}</label>
            <button onClick={() => props.handleDeleteReviewer(i)}>-</button>
        </div>));
    }
    return (
        <div>
            <label>Reviewers:</label>
            <div>
                <input onChange={(e) => props.handleChangeReviewer(e)} value={props.newReviewer}></input>
                <button onClick={() => props.handleAddReviewer()}>add</button>
            </div>
            <div>
                {reviewerList}
            </div>

        </div >
    );
};

export default Reviewer;
