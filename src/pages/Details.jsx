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
            <div className="pesan"> Loading.. </div>
        )
    }
    if (error) {
        return (
            <div className="pesan"> {error} </div>
        )
    }
    if (!mealDetails) {
        return (
            <div className="pesan">Meal not found.</div>
        )
    }
    return (
        <>
        <div className="box">
            <img src={mealDetails.strMealThumb} alt={mealDetails.strMeal} className="gambar"></img>
            <h1>{mealDetails.strMeal} <br></br>
                <p className="desc">{mealDetails.strCategory ? mealDetails.strCategory : ''}<br></br>
                {mealDetails.strArea ? mealDetails.strArea : ''}
                </p>
                {udahFav()}
            </h1>
            
            <div className="notitle">
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
        <div className="instruksi">
            {mealDetails.strInstructions}
        </div>
        </>
    )
}