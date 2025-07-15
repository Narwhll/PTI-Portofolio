import './Home.css'
import pizzaLogo from '../assets/pizza.png'

export default function Home() {
    return (
        <div class="herosection">
            <h1 class="titlenya">
            <img src={pizzaLogo} alt="Logo" class="pizzalogo"></img>
                Malmeal
            </h1>
            <p class="subtitle">the place for all your favorite meals.</p>
        </div>
    ) 
}