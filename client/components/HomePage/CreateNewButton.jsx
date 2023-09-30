import React from 'react';

const CreateNewButton = props => {
    return (
        <div>
            <button class='createNewButton' onClick={props.handleCreateNewClick}>New Submission</button>
        </div>
    );
};

export default CreateNewButton;
