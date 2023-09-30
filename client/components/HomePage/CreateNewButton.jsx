import React from 'react';

const CreateNewButton = props => {
    return (
        <div className='createNewButtonDiv'>
            <button class='createNewButton' onClick={props.handleCreateNewClick}>New Submission</button>
        </div>
    );
};

export default CreateNewButton;
