import { useEffect, useState } from 'react';

const useAuthStorage = () => {
    const [authenticated, setAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const storedAuthStatus = localStorage.getItem('authenticated') === 'true';
        setAuthenticated(storedAuthStatus);
    }, []); // Initialize the state based on localStorage on first render

    const updateAuthStatus = (isAuthenticated: boolean) => {
        if (isAuthenticated) {
            localStorage.setItem('authenticated', 'true');
            setAuthenticated(true);
        } else {
            localStorage.removeItem('authenticated');
            setAuthenticated(false);
        }
    };
    console.log('auth3===>',authenticated)

    return { authenticated, updateAuthStatus };
};

export default useAuthStorage;