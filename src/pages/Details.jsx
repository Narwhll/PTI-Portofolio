import { useParams } from 'react-router-dom';
import './Details.css';
import { useEffect, useState } from 'react';
import { addMealFav, getFavoriteMeals, removeMealFav } from '../utils/favfunc';


export default function Details () {
    const {idMeal} = useParams();
    const [mealDetails, setMealDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isFav, setisFav] = useState(false);

    function handleAddFav() {
        if (mealDetails) {
            addMealFav(mealDetails);
            setisFav(true);
        }
    }

    function handleRemFav() {
        if (mealDetails) {
            removeMealFav(mealDetails.idMeal);
            setisFav(false);
        }
    }

    function cekFav(idMeal) {
        if (!idMeal) {
            return false;
        }
        const fav = getFavoriteMeals();
        return fav.some(a => a.idMeal === idMeal);
    }

    useEffect(() => {
        async function fetchMealDetails() {
            setLoading(true);
            setError(null);
            try {
                const respon = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
                if (!respon.ok) {
                    throw new Error(`Error! Status: ${respon.status}`);
                    return;
                }
                const data = await respon.json();
                const fetched = data.meals ? data.meals[0] : null;
                setMealDetails(fetched);
                if (fetched) {
                    setisFav(cekFav(fetched.idMeal));
                }
                else {
                    setisFav(false);
                }
            }
            catch (e) {
                setError("Error while fetching data. Please try again.");
                console.error("Error, details: " + e);
            }
            finally {
                setLoading(false);
            }
        }
        if (idMeal) {
            fetchMealDetails();
        }
    }, [idMeal]);

    function udahFav() {
        if (isFav) {
            return <button onClick={handleRemFav} className='tomboludah'>Remove from Favorites</button>;
        }
        return <button onClick={handleAddFav} className='tombolbelum'>Mark as Favorite</button>;
    }

    if (loading) {
        return (
            <div class="pesan"> Loading.. </div>
        )
    }
    if (error) {
        return (
            <div class="pesan"> {error} </div>
        )
    }
    if (!mealDetails) {
        return (
            <div class="pesan">Meal not found.</div>
        )
    }
    return (
        <>
        <div class="box">
            <img src={mealDetails.strMealThumb} alt={mealDetails.strMeal} class="gambar"></img>
            <h1>{mealDetails.strMeal} <br></br>
                <p class="desc">{mealDetails.strCategory ? mealDetails.strCategory : ''}<br></br>
                {mealDetails.strArea ? mealDetails.strArea : ''}
                </p>
                {udahFav()}
            </h1>
            
            <div class="notitle">
                <h2>Ingredients</h2>
                <ul>
                    {
                    Array.from({length:20}, (_,i) => i++)
                        .map(i => {
                            const bahan = mealDetails[`strIngredient${i}`];
                            const takaran = mealDetails[`strMeasure${i}`];
                            if (bahan && bahan.trim() !== '') {
                                return (
                                    <li key={i}>
                                        {takaran} {bahan}
                                    </li>
                                )
                            }
                            return null;
                        })
                    }
                </ul>
            </div>
        </div>
        <div class="instruksi">
            {mealDetails.strInstructions}
        </div>
        </>
    )
}