export async function fetchPokemonDataAvatar(id) {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (!res.ok) throw new Error("Nie udało się pobrać Pokemona");
    const data = await res.json();
    return {
      id: data.id,
      name: data.name,
      sprite: data.sprites.other['official-artwork'].front_default
    };
  } catch (err) {
    console.error(err);
    return null;
  }
}
