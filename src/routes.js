import React from 'react';
import {useSelector, useDispatch} from "react-redux";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from 'react-router-dom';

import Auth from "./pages/auth";
import LoaderBrice from "./components/common/LoaderBrice";

import {useKeycloak} from '@react-keycloak/web';
import Home from "./pages/home";
import Profile from "./pages/profile";

const AppRouter = () => {
    const {keycloak, initialized} = useKeycloak();
    //
    // console.log('keycloak:', keycloak);
    // console.log('initialized:', initialized);
    // console.log('keycloak authenticated:', keycloak.authenticated);

    if (initialized) {
        if (keycloak.authenticated) {
            return (
                <Router>
                    <Switch>
                        <Route path="/profile">
                            <Profile/>
                        </Route>

                        <Route path="/home">
                            <Home/>
                        </Route>

                        <Redirect to="/home"/>
                    </Switch>
                </Router>
            )
        } else {
            return (
                <Router>
                    <Switch>
                        <Route path="/auth">
                            <Auth/>
                        </Route>

                        <Redirect to="/auth"/>
                    </Switch>
                </Router>
            )
        }
    } else {
        return <LoaderBrice/>;
    }
};

export default AppRouter;
