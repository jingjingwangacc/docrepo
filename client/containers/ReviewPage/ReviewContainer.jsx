import React from 'react';

const ReviewContainer = (props) => {
    return (
        <div className="mainContainer">
            <label>Review: {props.match.params.id}</label>
        </div>
    );
};

export default ReviewContainer;
