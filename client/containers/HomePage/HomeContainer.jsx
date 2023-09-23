import React from 'react';
import { Link } from 'react-router-dom'

const HomeContainer = (props) => {
    return (
        <div className="mainContainer">
            <h1>Home Page</h1>
            <div>
                <Link to="/submit">New Submission</Link>
            </div>
            <div>
                <Link to="/review/1">Review</Link>
            </div>
        </div>
    );
};

export default HomeContainer;
