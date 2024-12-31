import { useEffect, useState } from 'react';
import axios from 'axios';
import keycloak from "../keycloak.tsx";

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
}

const Products = ({authenticated}:{authenticated:boolean}) => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            // Get the access token from Keycloak
            const token = keycloak.token;

            try {
                // Use axios to make a GET request with the access token in the Authorization header
                const response = await axios.get('http://localhost:8090/products', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                // Set the products data received from the API
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        if (authenticated) {
            fetchProducts(); // Fetch products when authenticated
        }
    }, []);

    return (
        <div className="p-8">
            <h1 className="text-2xl font-semibold mb-4">Products Page</h1>
            <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
                <thead className="bg-gray-200">
                <tr>
                    <th className="px-4 py-2 text-left">ID</th>
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-left">Description</th>
                    <th className="px-4 py-2 text-left">Price</th>
                    <th className="px-4 py-2 text-left">Quantity</th>
                </tr>
                </thead>
                <tbody>
                {products.map((product) => (
                    <tr key={product.id} className="border-b">
                        <td className="px-4 py-2">{product.id}</td>
                        <td className="px-4 py-2">{product.name}</td>
                        <td className="px-4 py-2">{product.description}</td>
                        <td className="px-4 py-2">${product.price}</td>
                        <td className="px-4 py-2">{product.quantity}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Products;