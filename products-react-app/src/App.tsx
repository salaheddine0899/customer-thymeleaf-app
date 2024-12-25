import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Customers from './pages/Customers';
import Products from './pages/Products';
import { useEffect, useState } from 'react';
import keycloak from './keycloak'; // Ensure you have a single instance of Keycloak

const App = () => {
    const [authenticated, setAuthenticated] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const initializeKeycloak = async () => {
            try {
                // Initialize Keycloak with redirect URL
                await keycloak.init({ onLoad: 'login-required', redirectUri: window.location.href });
                setAuthenticated(keycloak.authenticated??false);
            } catch (error) {
                console.error("Keycloak initialization failed", error);
                setAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        initializeKeycloak();
    }, []); // This effect runs only once

    if (loading) {
        return <div>Loading...</div>;
    }

    // Redirect to Keycloak login page if the user is not authenticated
    if (!authenticated) {
        keycloak.login(); // This will redirect the user to Keycloak's login page
        return <div>Redirecting to login...</div>; // You can show a loading message
    }

    return (
        <Router>
            <Navbar />
            <div className="container mx-auto mt-8">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/customers" element={<Customers />} />
                    <Route
                        path="/products"
                        element={authenticated ? <Products /> : <Navigate to="/" />}
                    />
                </Routes>
            </div>
        </Router>
    );
};

export default App;