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
import HomeContainer from "./containers/HomePage/HomeContainer"
import SubmitContainer from "./containers/SubmitPage/SubmitContainer"
import ReviewContainer from "./containers/ReviewPage/ReviewContainer"

const App = () => {
    return (
        <div>
            <Switch>
                <Route
                    exact path="/"
                    component={HomeContainer}
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
        </div>
    );
}

export default App;
