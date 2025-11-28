import './PokemonsFights.css';
import PokemonsFightCards from '../pokemonsFightCards/PokemonsFightCards';
import { useEffect, useState } from 'react';


export default function PokemonsFights() {
    const [pokemon1_id, setPokemon1Id] = useState(null);
    const [pokemon2_id, setPokemon2Id] = useState(null);
    const [battleSessionId, setBattleSessionId] = useState(null);

    const fetchBattle = async () => {
        try {
            const pairRes = await fetch(`${import.meta.env.VITE_POKEPARTY_API_URL}/popularity/pair-to-battle`);
            const pairData = await pairRes.json();
            
            setPokemon1Id(pairData.pokemon1_id);
            setPokemon2Id(pairData.pokemon2_id);
            setBattleSessionId(pairData.session_id);
        } catch (error) {
            console.error('Error fetching battle data:', error);
        } finally {
        }
    };

    useEffect(() => {
        fetchBattle();
    }, []);

    const handleVote = async (winnerId) => {
        try {
            await fetch(`${import.meta.env.VITE_POKEPARTY_API_URL}/popularity/vote/${battleSessionId}/${winnerId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });
        } catch (error) {
            console.error('Error submitting vote:', error);
        } finally {
            fetchBattle();
        }
    };

    return (
        <section className="randomPokemonsSection">
            <h1 className='YourChoice'>Vote, which one do you like more?</h1>
            <div className="positioningPokemons">
                {pokemon1_id && <PokemonsFightCards pokemon_id={pokemon1_id} onClick={() => handleVote(pokemon1_id)} />}
                {pokemon2_id && <PokemonsFightCards pokemon_id={pokemon2_id} onClick={() => handleVote(pokemon2_id)} />}
            </div>
        </section>
    )
}