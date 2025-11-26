import './RandomPokemons.css';
import RandomPokemonsCards from '../randomPokemonsCards/RandomPokemonsCards';
import { useEffect, useState } from "react";
export default function RandomPokemons() {
    const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);

  const TOTAL_POKEMON = 1025; {/* Tyle jest pokemonów w pokeapi */ }
  const NUM_RANDOM = 10;

  useEffect(() => {
    const fetchRandomPokemons = async () => {
      try {
        const ids = [];
        while (ids.length < NUM_RANDOM) {
          const randomId = Math.floor(Math.random() * TOTAL_POKEMON) + 1;
          if (!ids.includes(randomId)) ids.push(randomId);
        }

        const promises = ids.map(id =>
          fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(res => res.json())
        );

        const data = await Promise.all(promises);

        const formatted = data.map(p => ({
          id: p.id,
          name: p.name.charAt(0).toUpperCase() + p.name.slice(1),
          types: p.types.map(t => t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)).join(", "),
          sprite: p.sprites.other['official-artwork'].front_default || "",
        }));

        setPokemons(formatted);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRandomPokemons();
  }, []);

  if (loading) return <p>Ładowanie...</p>;

  return (
    <div className="positioningRandomPokemons">
      {pokemons.map(p => (
        <RandomPokemonsCards
          key={p.id}
          name={p.name}
          type={p.types}
          img={p.sprite}
        />
      ))}
    </div>
  );
}         
