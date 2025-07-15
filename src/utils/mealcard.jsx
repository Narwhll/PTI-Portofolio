import { Link } from "react-router-dom"


export default function MealCard({meal}) {
    return (
        <Link to={`/details/${meal.idMeal}`} class="mealcard">
            <img src={meal.strMealThumb} alt={meal.strMeal} class="logomakan"/>
            {meal.strMeal}
        </Link>
    )
}