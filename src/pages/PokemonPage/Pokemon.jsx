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
                // Pobranie głównego Pokemona
                const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
                if (!res.ok) {
                    navigate("/");
                    return;
                }
                const data = await res.json();

                // Pobranie species (link do evolution chain)
                const speciesRes = await fetch(data.species.url);
                const speciesData = await speciesRes.json();

                // Pobranie evolution chain
                const evoRes = await fetch(speciesData.evolution_chain.url);
                const evoData = await evoRes.json();

                // Tworzymy listy ewolucji
                const evolutionList = [];
                const evolutionDetails = [];

                // Funkcja przechodząca drzewo ewolucji od pierwszego Pokémona
                const traverse = node => {
                    const fromName = node.species.name;
                    evolutionList.push(fromName);

                    node.evolves_to.forEach(evo => {
                        const toName = evo.species.name;
                        const level = evo.evolution_details[0]?.min_level || null;

                        evolutionDetails.push({
                            from: capitalize(fromName),
                            to: capitalize(toName),
                            level: level
                        });

                        traverse(evo);
                    });
                };

                traverse(evoData.chain);

                setPokemonData({
                    name: capitalize(data.name),
                    id: data.id,
                    types: data.types.map(t => capitalize(t.type.name)),
                    sprite: data.sprites.other['official-artwork'].front_default,
                    height: (data.height / 10).toFixed(1).toString().replace(".", ","),
                    weight: (data.weight / 10).toFixed(1).toString().replace(".", ","),
                    evolution: evolutionList.map(capitalize),
                    evolutionDetails: evolutionDetails
                });

            } catch (err) {
                console.error("Error fetching Pokémon:", err);
                navigate("/");
            }
        };

        fetchPokemon();
    }, [name, navigate]);

    // Funkcja pomocnicza
    const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

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
