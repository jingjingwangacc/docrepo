/**
 * ************************************
 *
 * @module  App.jsx
 * @author
 * @date
 * @description
 *
* ************************************
*/

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LoginContainer from './containers/LoginPage/LoginContainer';
import HomeContainer from "./containers/HomePage/HomeContainer"
import SubmitContainer from "./containers/SubmitPage/SubmitContainer"
import ReviewContainer from "./containers/ReviewPage/ReviewContainer"

const App = () => {
    return (
        <Switch>
            <Route
                exact path="/"
                component={HomeContainer}
            />
            <Route
                exact path="/login"
                component={LoginContainer}
            />
            <Route
                exact path="/submit"
                component={SubmitContainer}
            />
            <Route
                exact path="/review/:id"
                component={ReviewContainer}
            />
        </Switch>
    );
}

export default App;
