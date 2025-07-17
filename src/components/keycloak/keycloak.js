import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
    url: 'http://localhost:8082/',
    realm: 'fridge-tracker',
    clientId: 'fridge-tracker-fe',
    redirectUri: 'http://localhost:5173',
    logoutRedirectUri: 'http://localhost:5173'
});

export default keycloak;