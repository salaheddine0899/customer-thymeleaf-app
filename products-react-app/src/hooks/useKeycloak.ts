import { useEffect } from 'react';
import keycloak from '../keycloak';
import useAuthStorage from './useAuthStorage';  // Import the custom hook for handling auth state in localStorage

const useKeycloak = () => {
    const { authenticated, updateAuthStatus } = useAuthStorage();  // Use the custom hook

    useEffect(() => {
        const initializeKeycloak = async () => {
            try {
                const isAuthenticated = localStorage.getItem('authenticated') === 'true';
                if (!isAuthenticated) {
                    await keycloak.init({
                        onLoad: 'login-required',
                        redirectUri: window.location.href,
                    });
                    if(keycloak.authenticated)
                        updateAuthStatus(true);

                } else {

                    updateAuthStatus(true); // Update the state if already authenticated
                }
                console.log('Keycloak initialized', keycloak.authenticated);
            } catch (error) {
                console.error("Keycloak initialization failed:", error);
            }
        };

        initializeKeycloak();
    }, []); // Depend on updateAuthStatus function

    // Sync Keycloak authentication state with the localStorage and state
    useEffect(() => {
        if (keycloak.authenticated) {
            updateAuthStatus(true);
        } else {
            updateAuthStatus(false);
        }
    }, [keycloak.authenticated]);  // Sync with keycloak state

    console.log('auth2===>',authenticated)

    return { authenticated };
};

export default useKeycloak;
