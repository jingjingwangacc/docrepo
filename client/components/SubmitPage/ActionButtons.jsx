import React from 'react';

const ActionButtons = props => {
    return (
        <div class='submitButtonAndCancel'>
            <div>
                <button class='submitButton' onClick={props.handleSubmit}>Submit</button>
            </div>
            <div>
                <button class='cancelButton'onClick={props.handleCancel}>Cancel</button>
            </div>
        </div >
    );
};

export default ActionButtons;
