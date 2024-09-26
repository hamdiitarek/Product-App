import React, { useState, useEffect } from 'react';

const Product = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [filterRating, setFilterRating] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    const [skip, setSkip] = useState(0);
    const limit = 30; 
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                let allProducts = [];
                let hasMoreData = true;
                let currentSkip = skip;

                while (hasMoreData) {
                    const response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${currentSkip}`);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const result = await response.json();
                    allProducts = allProducts.concat(result.products);
                    setHasMore(result.products.length === limit);
                    currentSkip += limit;
                    
                    if (result.products.length < limit) {
                        hasMoreData = false;
                    }
                }

                setData(allProducts);

                // Extract unique categories
                const uniqueCategories = Array.from(new Set(allProducts.map(product => product.category)));
                setCategories(['all', ...uniqueCategories]);

                setLoading(false);
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, [skip]);

    useEffect(() => {
        let filtered = data;

        // Filter by rating
        if (filterRating !== '') {
            filtered = filtered.filter(product => product.rating >= parseFloat(filterRating));
        }

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(product => 
                product.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filter by category
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(product => product.category === selectedCategory);
        }

        setFilteredData(filtered);
    }, [filterRating, searchTerm, selectedCategory, data]);

    const handleFilterChange = (event) => {
        setFilterRating(event.target.value);
    }

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    }

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    }

    const handleReset = () => {
        setFilterRating('');
        setSearchTerm('');
        setSelectedCategory('all');
    }

    return (
        <div>
            <h1>Products</h1>

            <label htmlFor="ratingFilter">Filter by rating (higher than):</label>
            <input 
                type="number" 
                id="ratingFilter" 
                value={filterRating} 
                onChange={handleFilterChange} 
                min="0" 
                max="5"
            />

            <label htmlFor="search">Search:</label>
            <input 
                type="text" 
                id="search" 
                value={searchTerm} 
                onChange={handleSearchChange} 
                placeholder="Search by title"
            />

            <label htmlFor="category">Category:</label>
            <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
                {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                ))}
            </select>

            <button onClick={handleReset}>Reset</button>

            {loading ? (
                <p>Loading products...</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Rating</th>
                            <th>Price</th>
                            <th>View</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((product) => (
                            <tr key={product.id} className="product">
                                <td>{product.id}</td>
                                <td><img src={product.thumbnail} alt={product.title} style={{ width: "300px" }} /></td>
                                <td>{product.title}</td>
                                <td>{product.rating}</td>
                                <td>${product.price}</td>
                                <td>
                                    <a href={`/products/${product.id}`}>View</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Product;
