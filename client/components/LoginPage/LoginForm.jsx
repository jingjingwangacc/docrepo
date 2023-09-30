import React from 'react';

const LoginForm = props => {
    return (
        <div className='loginForm'>
            <div className="loginTitle">
                Log In
            </div>
            <div className='labeledInput'>
                <label className='submitLabel'>Username</label>
                <input className='submitInput' onChange={(e) => props.handleChangeUserName(e)} value={props.userName}></input>
            </div>
            <div className='labeledInput'>
                <label className='submitLabel'>Password</label>
                <input className='submitInput' type={'password'} onChange={(e) => props.handleChangePassword(e)} value={props.password}></input>
            </div>
            <div>
                <button className='submitButton' onClick={props.handleSubmit}>Log In</button>
            </div>
        </div >
    );
};

export default LoginForm;
