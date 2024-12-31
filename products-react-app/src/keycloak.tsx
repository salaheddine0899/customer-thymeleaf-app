import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
    url: 'http://localhost:8080',
    realm: 'ama-realm',
    clientId: 'demo-customer-react-app',
});

// Token refresh logic
keycloak.onTokenExpired = async () => {
    try {
        console.log("Token expired. Refreshing...");
        await keycloak.updateToken(30); // Refresh token if it will expire in the next 30 seconds
    } catch (error) {
        console.error("Failed to refresh token. Logging out...");
        await keycloak.logout();
    }
};

export default keycloak;
