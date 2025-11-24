import Header from '../components/header/Header.jsx'
import PokemonOfTheDay from '../components/pokemonOfTheDay/PokemonOfTheDay.jsx'
import PokemonsFights from '../components/pokemonsFights/PokemonsFights.jsx';
import './MainPage.css';
export default function MainPage() {
    return (
        <div>
            <Header />
            <div className="mainContainer">
                <div className='sectionsContainer'>
                    <PokemonsFights />
                    <PokemonOfTheDay />
                </div>
            </div>
        </div>
    )
}