import { useState, useEffect } from "react";
import tempPic from '../../assets/images/tempPic.png'; 
import { useNavigate } from "react-router-dom";
import './PokemonOfTheDay.css';

export default function PokemonOfTheDay() {
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigateRC = useNavigate();

    const handleClick = () => {
        navigateRC(`/pokemon/${pokemonData.name.toLowerCase()}`);
    }

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const res = await fetch('http://localhost:8000/pokemon-otd');
        if (!res.ok) throw new Error('Błąd przy pobieraniu Pokémona dnia');
        const data = await res.json();
        const pokemonId = data.pokemon_of_the_day.pokemon_id;

        const pokeRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        if (!pokeRes.ok) throw new Error('Błąd przy pobieraniu danych Pokémona');
        const pokeData = await pokeRes.json();

        setPokemonData({
          name: pokeData.name.charAt(0).toUpperCase() + pokeData.name.slice(1),
          types: pokeData.types.map(t => t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)),
          sprite: pokeData.sprites.other['official-artwork'].front_default || tempPic,
          height: (pokeData.height / 10).toFixed(1),
          weight: (pokeData.weight / 10).toFixed(1),
        });

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPokemon();
  }, []);

  if (loading) return <p>Ładowanie...</p>;
  if (!pokemonData) return <p>Nie udało się pobrać Pokemona dnia.</p>;
  
  return (
    <section className="pokemonOfTheDaySection" onClick={handleClick}>
      <h1 className="potdSectionTitle">Pokémon of the Day</h1>
      <div className="pokemonOfTheDayContainer">
        <img src={pokemonData.sprite} alt={pokemonData.name} className='pokemonPicture'/>
        <div className="pokemonOfTheDayInfo">
          <h2 className="pokemonName">{pokemonData.name}</h2>
          <p className="pokemonType">Type: {pokemonData.types.join(", ")}</p>
          <p className="pokemonDescription">
            Height: {pokemonData.height} m | Weight: {pokemonData.weight} kg
          </p>
        </div>
      </div>
    </section>
  );
}
