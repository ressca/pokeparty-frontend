import './PokemonsFightCards.css';
import { useEffect, useState } from 'react';
import loadingSVG from '../../assets/animations/loading.svg';

export default function PokemonsFightCards({ pokemon_id, onClick }) {
    const [pokemonData, setPokemonData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [imageLoading, setImageLoading] = useState(true);

    useEffect(() => {
        const fetchPokemonData = async () => {
            try {
                setLoading(true);
                setImageLoading(true);
                const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon_id}`);
                const data = await res.json();

                setPokemonData({
                    name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
                    types: data.types.map(t => t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)),
                    sprite: data.sprites.other['official-artwork'].front_default,
                });
            } catch (error) {
                console.error('Error fetching pokemon data:', error);
            } finally {
                setLoading(false);
            }
        };

        if (pokemon_id) {
            fetchPokemonData();
        }
    }, [pokemon_id]);

    if (loading) {
        return (
            <div className='pokemonCard' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
                <img src={loadingSVG} alt="Loading..." style={{ width: '50px', height: '50px' }} />
            </div>
        );
    }

    return (
        <div className='pokemonCard' onClick={onClick}>
            <div className='pokemonImageContainer'>
                {imageLoading && <img src={loadingSVG} alt="Loading..." style={{ width: '50px', height: '50px' }} />}
                <img 
                    className='pokemonImage' 
                    src={pokemonData?.sprite} 
                    alt='pokemon'
                    onLoad={() => setImageLoading(false)}
                    style={{ display: imageLoading ? 'none' : 'block' }}
                />
            </div>
            <div className='pokemonInfoContainer'>
                <div className='pokemonName'>{pokemonData?.name}</div>
                <div className='pokemonType'>Type: {pokemonData?.types.join(', ')}</div>
            </div>
        </div>
    )
}