import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Search.css";
import searchSymbol from "../../assets/images/searchSymbol.png";

export default function Search() {
  const [query, setQuery] = useState("");
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Pobranie listy pokemonów z API
  useEffect(() => {
    async function fetchPokemonList() {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20000");
      const data = await res.json();
      setPokemonList(data.results.map(p => p.name)); // tylko nazwy
      setLoading(false);
    }
    fetchPokemonList();
  }, []);

  const filtered = pokemonList.filter((p) =>
    p.toLowerCase().startsWith(query.toLowerCase()) && query !== ""
  );

  const handleSelect = (name) => {
    navigate(`/pokemon/${name}`);
    setQuery("");
  };

  return (
    <div style={{ position: "relative" }}>
      <div className="searchBar">
        <input
          type="text"
          placeholder={loading ? "Loading Pokémon..." : "Search Pokémon..."}
          className="search-input"
          value={query}
          disabled={loading}
          onChange={(e) => setQuery(e.target.value)}
        />
        <img src={searchSymbol} alt="Search Icon" className="searchSymbol" />
      </div>

      {!loading && filtered.length > 0 && (
        <ul className="suggestions">
          {filtered.slice(0, 20).map((name) => (  // max 20 wyników naraz
            <li
              key={name}
              onClick={() => handleSelect(name)}
              className="suggestion-item"
            >
              {name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
