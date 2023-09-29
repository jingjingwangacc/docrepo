import React from 'react';
import { Link } from 'react-router-dom'

const CreateNewButton = props => {
    return (
        <div>
            <Link to="/submit">New Submission</Link>
        </div>
    );
};

export default CreateNewButton;
