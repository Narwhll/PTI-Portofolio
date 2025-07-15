import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import pizzaLogo from './assets/pizza.png'

function Navbar() {
    return (
        <nav className="navbar">
            <Link to="/" className="title">
            <img src={pizzaLogo} alt="Logo" className="pizzatitle"></img> Malmeal.
            </Link>
            <ul className="kanan">
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