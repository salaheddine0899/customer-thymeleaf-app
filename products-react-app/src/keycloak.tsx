import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
    url: 'http://localhost:8080',
    realm: 'ama-realm',
    clientId: 'demo-customer-react-app',
});

export default keycloak;
