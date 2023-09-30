import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loggedIn: false,
    userId: -1,
    userName: "",
    password: "",
};

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setUserName: (state, { payload: newUserName }) => {
            state.userName = newUserName;
        },
        setPassword: (state, { payload: newPassword }) => {
            state.password = newPassword;
        },
        login: (state, { payload: loginData }) => {
            state.userId = loginData.userId;
            state.userName = loginData.userName;
            // Clear password after login.
            state.password = "";
            state.loggedIn = true;
        },
        logout: (state) => {
            state.loggedIn = false;
            state.userId = -1;
            state.userName = "";
            state.password = "";
        }
    }
});

export const { setUserName, setPassword, login, logout } = loginSlice.actions

export default loginSlice.reducer