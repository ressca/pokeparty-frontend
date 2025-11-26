import './PokemonsFightCards.css';
import { useEffect, useState } from 'react';

export default function PokemonsFightCards({ pokemon_id }) {
    const [pokemonData, setPokemonData] = useState(null);

    useEffect(() => {
        const fetchPokemonData = async () => {
            try {
                const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon_id}`);
                const data = await res.json();

                setPokemonData({
                    name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
                    types: data.types.map(t => t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)),
                    sprite: data.sprites.other['official-artwork'].front_default,
                });
            } catch (error) {
                console.error('Error fetching pokemon data:', error);
            }
        };

        fetchPokemonData();
    }, [pokemon_id]);

    return (
        
        <div className='pokemonCard'>
            <div className='pokemonImageContainer'>
                <img className='pokemonImage' src={pokemonData?.sprite} alt='pokemon'/>
            </div>
            <div className='pokemonInfoContainer'>
                <div className='pokemonName'>{pokemonData?.name}</div>
                <div className='pokemonType'>Type: {pokemonData?.types.join(', ')}</div>
            </div>
        </div>
    )
}