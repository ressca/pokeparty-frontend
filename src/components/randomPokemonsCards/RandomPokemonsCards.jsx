import './RandomPokemonsCards.css';
export default function RandomPokemonsCards(props) {
    return (
            <article className="pokemonCards">
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