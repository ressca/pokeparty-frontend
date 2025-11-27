import { useEffect, useState } from "react";
import { fetchPokemonDataAvatar } from "./pokemonFetchAvatar";

export default function PokemonAvatar({ id, size = 100, showName}) {
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    if (!id) return;
    fetchPokemonDataAvatar(id).then(data => setPokemon(data));
  }, [id]);

  if (!pokemon) return <p>Brak Pokemona</p>;

  return (
    <div style={{ textAlign: "center" }}>
      <img
        src={pokemon.sprite}
        alt={pokemon.name}
        width={size}
        height={size}
      />
      {showName && <p>{pokemon.name}</p>}
    </div>
  );
}
