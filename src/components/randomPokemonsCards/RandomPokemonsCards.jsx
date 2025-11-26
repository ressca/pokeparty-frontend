import './RandomPokemonsCards.css';
import { useNavigate } from "react-router-dom";
export default function RandomPokemonsCards(props) {
    const navigateRC = useNavigate();

    const handleClick = () => {
        navigateRC(`/pokemon/${props.name.toLowerCase()}`);
    }
    return (
            <article className="pokemonCards" onClick={handleClick}>
                <div className='randomPokemonCardImageContainer'>
                    <img className="pokemonImage" src={props.img} alt='pokemon'/>
                </div>
                <div className="randomPokemonInfoContainer">
                    <div className="pokemonName">{props.name}</div>
                    <div className="pokemonType">Type: {props.type}</div>
                </div>
            </article>
    )
}