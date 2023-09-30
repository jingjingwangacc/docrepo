import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LoginForm from '../../components/LoginPage/LoginForm';
import { setUserName, setPassword, login, logout } from '../../slice/loginSlice';
import { useHistory } from "react-router-dom";
import HeadBar from "../../components/HeadBar"

const LoginContainer = (props) => {
    const pageState = useSelector(state => state.login);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleChangeUserName = (e) => {
        dispatch(setUserName(e.target.value));
    }

    const handleChangePassword = (e) => {
        dispatch(setPassword(e.target.value));
    }

    const handleSubmit = () => {
        fetch('/api/user/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userName: pageState.userName,
                userPwd: pageState.password
            })
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                if (res !== null) {
                    console.log("Succeed");
                    dispatch(login(res));
                    // Go to home page.
                    history.push('/');
                } else {
                    dispatch(logout());
                }
            })
    }

    return (
        <div className="mainContainer">
            <HeadBar />
            <div className="loginContainer">
                <LoginForm
                    userName={pageState.userName}
                    password={pageState.password}
                    handleChangeUserName={handleChangeUserName}
                    handleChangePassword={handleChangePassword}
                    handleSubmit={handleSubmit} />
            </div>
        </div>
    );
};

export default LoginContainer;
