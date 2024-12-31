import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Customers from './pages/Customers';
import Products from './pages/Products';
import useKeycloak from "./hooks/useKeycloak.ts";

const App = () => {

    const { authenticated } = useKeycloak();
    console.log('auth1===>',authenticated)


    return (
        <Router>
            <Navbar />
            <div className="container mx-auto mt-8">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/customers" element={<Customers />} />
                    <Route
                        path="/products"
                        element={authenticated ? <Products authenticated={authenticated} /> : <Navigate to="/" />
                    }
                    />
                </Routes>
            </div>
        </Router>
    );
};

export default App;