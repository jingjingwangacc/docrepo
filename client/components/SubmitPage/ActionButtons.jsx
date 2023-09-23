import React from 'react';

const ActionButtons = props => {
    return (
        <div>
            <div>
                <button onClick={props.handleSubmit}>Submit</button>
            </div>
            <div>
                <button onClick={props.handleCancel}>Cancel</button>
            </div>
        </div >
    );
};

export default ActionButtons;
