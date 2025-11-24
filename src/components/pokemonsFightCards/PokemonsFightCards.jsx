import './PokemonsFightCards.css';
export default function PokemonsFightCards(props) {
    return (
        <div className='pokemonCard'>
            <div className='pokemonImageContainer'>
                <img className='pokemonImage' src={props.img} alt='pokemon'/>
            </div>
            <div className='pokemonInfoContainer'>
                <div className='pokemonName'>{props.name}</div>
                <div className='pokemonType'>{props.type}</div>
            </div>
        </div>
    )
}