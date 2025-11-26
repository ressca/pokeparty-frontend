import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Pokemon.css';
import PokemonInfo from '../../components/PokemonInfo/PokemonInfo';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

export default function Pokemon() {

    const { name } = useParams(); 
    const navigate = useNavigate();
    const [pokemonData, setPokemonData] = useState(null);

    useEffect(() => {
        if (!name) {
            navigate("/");
            return;
        }

        const fetchPokemon = async () => {
            try {
                const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);

                if (!res.ok) {
                    navigate("/");
                    return;
                }

                const data = await res.json();

                setPokemonData({
                    name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
                    id: data.id,
                    types: data.types.map(t => t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)),
                    sprite: data.sprites.other['official-artwork'].front_default,
                    height: (data.height / 10).toFixed(1).toString().replace(".", ","),
                    weight: (data.weight / 10).toFixed(1).toString().replace(".", ","),
                });
            } catch (err) {
                console.error("Error fetching Pokémon:", err);
                navigate("/");
            }
        };

        fetchPokemon();
    }, [name, navigate]);

    return (
        <div className='abc'>
            <Header />

            {!pokemonData ? (
                <p>Loading...</p>
            ) : (
                <PokemonInfo {...pokemonData} />
            )}

            <div className='def'>
                <Footer />
            </div>
        </div>
    );
}
