import React from 'react';

const ActionButtons = props => {
    return (
        <div className='submitButtonAndCancel'>
            <div>
                <button className='submitButton' onClick={props.handleSubmit}>Submit</button>
            </div>
            <div>
                <button className='cancelButton'onClick={props.handleCancel}>Cancel</button>
            </div>
        </div >
    );
};

export default ActionButtons;
