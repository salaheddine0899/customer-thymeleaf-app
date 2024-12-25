import { Link } from 'react-router-dom';

const Navbar = () => {
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
            </ul>
        </nav>
    );
};

export default Navbar;