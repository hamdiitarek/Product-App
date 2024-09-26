import { useState, useEffect } from "react";

const useFetch = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('https://fakestoreapi.com/products');
            const data = await response.json();
            setProducts(data);
        }
        fetchProducts();
    }, []);
    return products;
}

export default useFetch;