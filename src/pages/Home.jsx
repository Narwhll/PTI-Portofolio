import './Home.css'
import pizzaLogo from '../assets/pizza.png'

export default function Home() {
    return (
        <div className="herosection">
            <h1 className="titlenya">
            <img src={pizzaLogo} alt="Logo" className="pizzalogo"></img>
                Malmeal
            </h1>
            <p className="subtitle">the place for all your favorite meals.</p>
        </div>
    ) 
}