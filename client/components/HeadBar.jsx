import React from 'react';
import { useHistory } from "react-router-dom";

const HeadBar = props => {
    const history = useHistory();
    return (
        <div className='headBar'>
            <div className='logo' onClick={() => { history.push('/'); }}>
                Review Portal
            </div>
        </div>
    );
};

export default HeadBar;
