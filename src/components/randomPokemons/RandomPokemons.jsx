import './RandomPokemons.css';
import RandomPokemonsCards from '../randomPokemonsCards/RandomPokemonsCards';
export default function RandomPokemons() {
    return (
            <div className="positioningRandomPokemons">
                <RandomPokemonsCards /> 
                <RandomPokemonsCards /> 
                <RandomPokemonsCards /> 
                <RandomPokemonsCards /> 
                <RandomPokemonsCards /> 
                <RandomPokemonsCards /> 
                <RandomPokemonsCards /> 
                <RandomPokemonsCards /> 
                <RandomPokemonsCards /> 
                <RandomPokemonsCards /> 
                {/* Tu będą się wyświetlać pokemony z api */}
            </div>
    )
}