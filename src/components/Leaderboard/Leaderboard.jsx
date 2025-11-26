import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import './Leaderboard.css';
import loadingSVG from '../../assets/animations/loading.svg';

export default function Leaderboard() {
    const [allRankings, setAllRankings] = useState([]);
    const [displayedData, setDisplayedData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const navigateRC = useNavigate();
    const BATCH_SIZE = 15;

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_POKEPARTY_API_URL}/popularity/`);
                const rankingData = await res.json();
                
                rankingData.sort((a, b) => b.elo - a.elo);
                
                setAllRankings(rankingData);
                
                await loadBatch(rankingData, 0);
                
            } catch (error) {
                console.error('Error fetching leaderboard data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLeaderboard();
    }, []);

    const loadBatch = async (allData, startIndex) => {
        const batch = allData.slice(startIndex, startIndex + BATCH_SIZE);
        if (batch.length === 0) return;

        if (startIndex > 0) setLoadingMore(true);

        const enrichedBatch = await Promise.all(
            batch.map(async (entry) => {
                try {
                    const pokeRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${entry.pokemon_id}`);
                    const pokeData = await pokeRes.json();
                    
                    return {
                        ...entry,
                        name: pokeData.name.charAt(0).toUpperCase() + pokeData.name.slice(1),
                        types: pokeData.types.map(t => t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)),
                        sprite: pokeData.sprites.other['official-artwork'].front_default,
                    };
                } catch (err) {
                    console.error(`Failed to fetch details for pokemon ${entry.pokemon_id}`, err);
                    return { ...entry, name: 'Unknown', types: [], sprite: null };
                }
            })
        );

        setDisplayedData(prev => [...prev, ...enrichedBatch]);
        setLoadingMore(false);
    };

    const handleLoadMore = () => {
        loadBatch(allRankings, displayedData.length);
    };

    const handleRowClick = (pokemon) => {
        navigateRC(`/pokemon/${pokemon.name.toLowerCase()}`);
    };

    if (loading) {
        return (
            <div className="leaderboardContainer" style={{ display: 'flex', justifyContent: 'center', padding: '50px' }}>
                <img src={loadingSVG} alt="Loading..." style={{ width: '50px' }} />
            </div>
        );
    }

    return (
        <div className="leaderboardContainer">
            <h1 className="leaderboardTitle">Most liked pokemons Elo</h1>
            <div className="leaderboardTableContainer">
                <table className="leaderboardTable">
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>ID</th>
                            <th>Pokemon</th>
                            <th>Name</th>
                            <th>Types</th>
                            <th>ELO</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedData.map((pokemon, index) => (
                            <tr key={pokemon.id || index} onClick={() => handleRowClick(pokemon)}>
                                <td className="rankCell">#{index + 1}</td>
                                <td className="idCell">{pokemon.pokemon_id}</td>
                                <td className="imageCell">
                                    {pokemon.sprite && (
                                        <img 
                                            src={pokemon.sprite} 
                                            alt={pokemon.name} 
                                            className="leaderboardPokemonImg"
                                        />
                                    )}
                                </td>
                                <td className="nameCell">{pokemon.name}</td>
                                <td className="typesCell">{pokemon.types.join(', ')}</td>
                                <td className="eloCell">{pokemon.elo}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            {displayedData.length < allRankings.length && (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <button 
                        className='load-more-button' 
                        onClick={handleLoadMore}
                        disabled={loadingMore}
                        style={{
                            opacity: loadingMore ? 0.7 : 1
                        }}
                    >
                        {loadingMore ? 'Loading...' : 'Load More'}
                    </button>
                </div>
            )}
        </div>
    );
}