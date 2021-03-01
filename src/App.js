import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import AppRouter from './routes';
import {useDispatch, useSelector} from "react-redux";
import {ReactKeycloakProvider} from "@react-keycloak/web";
import keycloak from "./utils/keycloak";
import {setToken} from "./store/app/appSlice";


function App() {
    const tokens = useSelector(state => state.app.token);
    const dispatch = useDispatch();
    const history = useHistory();

    const options = {
        refreshToken: tokens?.refreshToken,
        token: tokens?.accessToken
    };

    useEffect(() => {
        let LKtokens =  JSON.parse(localStorage.getItem('tokens'));

        console.log('LK tokens', LKtokens);

        if (LKtokens) {
            dispatch(setToken(LKtokens));
        }

    }, [dispatch]);


    // const onKeycloakEvent = (event, error) => {
    //     console.log('onKeycloakEvent', event, error);
    //
    //     switch (event) {
    //         case "onReady" :
    //             console.log('ready', keycloak);
    //             // dispatch(setUser(keycloak?.tokenParsed?.preferred_username));
    //             return;
    //         case "onAuthLogout":
    //             console.log('logout', keycloak);
    //             return;
    //         default:
    //             return
    //     }
    // };

    // const onKeycloakTokens = (tokens) => {
    //     console.log('onTokens:', tokens);
    //
    //     if (tokens?.refreshToken?.length) {
    //         dispatch(setToken(tokens));
    //     }
    //
    // };
    //
    // const onKeycloakTokensExpired = () => {
    //     keycloak.updateToken(5)
    //         .then(function (refreshed) {
    //             if (refreshed) {
    //                 alert('Token was successfully refreshed');
    //             } else {
    //                 alert('Token is still valid');
    //             }
    //         }).catch(function () {
    //         alert('Failed to refresh the token, or the session has expired');
    //     });
    // };

    return (
        <ReactKeycloakProvider
            authClient={keycloak}
            // onEvent={onKeycloakEvent}
            // onTokens={onKeycloakTokens}
            // onTokenExpired={onKeycloakTokensExpired}
        >
            <div className="App">
                <AppRouter/>
            </div>
        </ReactKeycloakProvider>
    );
}

export default App;
