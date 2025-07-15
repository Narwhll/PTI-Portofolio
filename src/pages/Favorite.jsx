import { getFavoriteMeals, removeMealFav } from '../utils/favfunc';
import './Favorite.css'
import { use, useEffect, useState } from 'react';
import MealCard from '../utils/mealcard';

export default function Favorite() {
    const [favMeals, setFavMeals] = useState([]);

    useEffect(() => {
        try {
            const favs = getFavoriteMeals();
            setFavMeals(favs);
        }
        catch (e) {
            setError("Failed to load.");
            console.log("Error: " + e);
        }
    }, []);

    function handleRemFav(idMealRemove) {
        removeMealFav(idMealRemove);
        setFavMeals(getFavoriteMeals());
    }

    if (favMeals.length === 0) {
        return <div className='belomada'>You have not set any meals as your favorite.</div>
    } 

    return (
        <div className="listmeals">
            <h1 className='titlemeals'>Your Favorite Meals</h1>
            {favMeals.map((meal) => (<MealCard key = {meal.idMeal} meal={meal}/>))}
        </div>
    )
}