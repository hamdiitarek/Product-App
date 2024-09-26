import React from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <header>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="products">Products</Link>
            <Link to="#">Login</Link>
        </header>
    );
};

export default Navbar;
