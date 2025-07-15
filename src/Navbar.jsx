import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import pizzaLogo from './assets/pizza.png'

function Navbar() {
    return (
        <nav class="navbar">
            <Link to="/" class="title">
            <img src={pizzaLogo} alt="Logo" class="pizzatitle"></img> Malmeal.
            </Link>
            <ul class="kanan">
                <li>
                    <Link to="/fav">Favorite</Link>
                </li>
                <li>
                    <Link to="/search">Search</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar