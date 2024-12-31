import { Link } from 'react-router-dom';
import keycloak from '../keycloak';

const Navbar = () => {
    const handleLogout = async () => {
        await keycloak.logout({
            redirectUri: window.location.origin,
        });
    };


    return (
        <nav className="bg-blue-600 p-4">
            <ul className="flex space-x-4 text-white">
                <li>
                    <Link to="/" className="hover:underline">Home</Link>
                </li>
                <li>
                    <Link to="/customers" className="hover:underline">Customers</Link>
                </li>
                <li>
                    <Link to="/products" className="hover:underline">Products</Link>
                </li>
                <li>
                    {keycloak.authenticated && (
                        <button
                            onClick={handleLogout}
                            className="text-white bg-red-500 p-2 rounded hover:bg-red-600"
                        >
                            Logout
                        </button>
                    )}
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
