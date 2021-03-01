import Keycloak from "keycloak-js";

const keyCloakConfig = {
    url: process.env.REACT_APP_KEYCLOAK_URL,
    // url: "http://localhost:8080/auth",
    realm: 'TestRealm',
    clientId: 'react-app'
};

const keycloak = new Keycloak(keyCloakConfig);

export default keycloak;