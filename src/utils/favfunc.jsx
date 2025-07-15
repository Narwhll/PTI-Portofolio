
const favkey = 'favoriteMeals';

export function getFavoriteMeals() {
    try {
        const favorites = localStorage.getItem(favkey);
        return favorites? JSON.parse(favorites) : [];
    }
    catch (e) {
        console.error("Error fetching the data from the local storage: " + e);
        return [];
    }
}

export function addMealFav(meal) {
    const newFav = {
        idMeal: meal.idMeal,
        strMeal: meal.strMeal,
        strMealThumb: meal.strMealThumb
    }
    const favorites = getFavoriteMeals();
    const alreadyfav = favorites.some(a => (a.idMeal === newFav.idMeal));
    if (!alreadyfav) {
        favorites.push(newFav);
        localStorage.setItem(favkey, JSON.stringify(favorites));
        return true;
    }
    return false;
}   

export function removeMealFav(idMeals) {
    let favorites = getFavoriteMeals();
    favorites = favorites.filter(a => a.idMeal != idMeals);
    localStorage.setItem(favkey, JSON.stringify(favorites));
}