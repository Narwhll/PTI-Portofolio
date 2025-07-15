import { useState } from 'react'
import React from 'react'
import { Link } from 'react-router-dom';
import './Search.css'
import searchLogo from '../assets/search.png'
import MealCard from '../utils/mealcard'

export default function Search() {
    const [query, setQuery] = useState("");
    const [searchResult, setResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function fetchMeals(searchName) {
        if (!searchName.trim()) {
            setResult([]);
            setLoading(false);
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const respon = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchName}`);
            if (!respon.ok) {
                throw new Error(`Error! Status: ${respon.status}`);
            }
            const data = await respon.json();
            setResult(data.meals || []);
        } catch (e) {
            setError("Failed to fetch the API. Please try again later.");
            console.error("Failed. Error: " + e);
            setResult([]);
        } finally {
            setLoading(false);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        fetchMeals(query);
    }

    return (
        <div className="boxsearch">
            <div className="Search">
                <h1>Search</h1>
                <form onSubmit={handleSubmit} className="searchbutton">
                    <input type="text" onChange={e => setQuery(e.target.value)} placeholder='Search for your favorite meals..' className='searchbar' />
                    <button type="submit" className="tombolsearch">
                        <img src={searchLogo} alt="Logo" className="logocari"></img>
                    </button>
                </form>
            </div>
            {loading && <div className="pesan"> Loading.. </div>}
            {error && <div className="pesan"> {error} </div>}
            {!loading && !error && query.length > 0 && searchResult.length === 0 && <p className="pesan">Menu not found!</p>}
            {!loading && !error && searchResult.length > 0 && (
                <div className="listmeal">
                    {searchResult.map((meal) => (<MealCard key = {meal.idMeal} meal={meal}/>))}
                </div>)}
        </div>
    )
}