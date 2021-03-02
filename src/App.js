import React, {useEffect, useStatem, useCallback} from 'react';
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
        onLoad: 'check-sso',
        checkLoginIframe: false,
        // token: tokens?.accessToken,
        // refreshToken: tokens?.refreshToken
        token: keycloak?.accessToken,
        refreshToken: keycloak?.refreshToken
    };

    const onKeycloakEvent = (event, error) => {
        console.log('onKeycloakEvent', event, error);

        switch (event) {
            case "onReady" :
                console.log('ready', keycloak);
                // dispatch(setUser(keycloak?.tokenParsed?.preferred_username));
                return;
            case "onAuthLogout":
                console.log('logout', keycloak);
                return;
            case "onAuthRefreshSuccess":
                console.log('authSuccess', keycloak);

                const tokens = {
                    accessToken: keycloak?.token,
                    refreshToken: keycloak?.refreshToken
                };

                localStorage.setItem('tokens', JSON.stringify(tokens));
                // dispatch(setToken(tokens));

                return;
            default:
                return
        }
    };

    const onKeycloakTokens = (tokens) => {
        console.log('onTokens:', tokens);
        // dispatch(setToken(tokens));
    };

    const onKeycloakTokensExpired = async () => {
        keycloak.updateToken(1)
    };

    return (
        <ReactKeycloakProvider
            initOptions={options}
            authClient={keycloak}
            onEvent={onKeycloakEvent}
            onTokens={onKeycloakTokens}
            onTokenExpired={onKeycloakTokensExpired}
        >
            <div className="App">
                <AppRouter/>
            </div>
        </ReactKeycloakProvider>
    );
}

export default App;
