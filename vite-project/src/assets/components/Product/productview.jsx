import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Productview = () => {
    const [data, setData] = useState({});
    const { id } = useParams();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`https://dummyjson.com/products/${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const product = await response.json();
                setData(product);
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        };
        fetchProduct();
    }, [id]);

    return (
        <div>
            <h1>Product View</h1>
            {data.id ? (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Rating</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr key={data.id} className="productview">
                            <td>{data.id}</td>
                            <td><img src={data.thumbnail} alt={data.title} style={{ width: "300px" }} /></td>
                            <td>{data.title}</td>
                            <td>{data.description}</td>
                            <td>{data.rating}</td>
                            <td>${data.price}</td>
                        </tr>
                    </tbody>
                </table>
            ) : (
                <p>Loading...</p>
            )}
            <a href={`/products`} style={{ marginTop: '20px', display: 'inline-block' }}>Back to Products</a>
        </div>
    );
};

export default Productview;
