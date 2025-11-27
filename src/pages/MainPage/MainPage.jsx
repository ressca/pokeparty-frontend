import { useEffect } from "react";
import Header from '../../components/header/Header.jsx'
import PokemonOfTheDay from '../../components/pokemonOfTheDay/PokemonOfTheDay.jsx'
import PokemonsFights from '../../components/pokemonsFights/PokemonsFights.jsx';
import RandomPokemons from '../../components/randomPokemons/RandomPokemons.jsx';
import Footer from '../../components/footer/Footer.jsx';
import './MainPage.css';
export default function MainPage() {
    useEffect(() => {
        document.body.classList.add("main-page");

        return () => {
            document.body.classList.remove("main-page");
        };
    }, []);

    return (
        <div className="mainPageBody">
            <Header />
            <div className="mainContainer">
                <div className='sectionsContainer'>
                    <PokemonsFights />
                    <PokemonOfTheDay />
                </div>
            </div>
            <div className="randomPokemonsContainer">
                <RandomPokemons />
            </div>
            <div className='footerContainer'>
                <Footer />
            </div>
        </div>
    )
}