import { useState, useEffect } from "react";
import Evolution from "../Evolution/Evolution";
import PokemonCard from "../PokemonCard/PokemonCard";
import { typeColors } from "../../utils";
import { useAuth } from "../../context/AuthContext.jsx";
import { useToast } from "../../context/ToastContext.jsx";
import "./PokemonInfo.css";

export default function PokemonInfo(props) {
  const [isFavorite, setIsFavorite] = useState(false);
  const { token } = useAuth();
  const { showToast } = useToast();

  // 🔵 Pobieranie ulubionych
  const fetchFavorites = async () => {
    if (!token) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_POKEPARTY_API_URL}/users/favorite-pokemons`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      if (!res.ok) throw new Error("Failed to load favorites");
      const favs = await res.json();
      if (Array.isArray(favs)) {
        setIsFavorite(favs.some((p) => p.pokemon_id === props.id));
      }
    } catch (err) {
      console.error("Fav error:", err);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, [props.id, token]);

  // ⭐ Dodawanie / usuwanie ulubionych
  const toggleFavorite = async () => {
    if (!token) {
      showToast("You must be logged in to favorite a Pokémon!", "error");
      return;
    }

    try {
      if (!isFavorite) {
        // ➕ DODAJ
        const res = await fetch(
          `${import.meta.env.VITE_POKEPARTY_API_URL}/users/favorite-pokemon`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ pokemon_id: Number(props.id) }),
          }
        );

        if (res.ok) {
          setIsFavorite(true);
        } else {
          const text = await res.text();
          console.error("Add favorite failed:", text);
        }
      } else {
        // ❌ USUŃ
        const res = await fetch(
          `${import.meta.env.VITE_POKEPARTY_API_URL}/users/favorite-pokemon/`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ pokemon_id: Number(props.id) }),
          }
        );

        if (res.ok) {
          setIsFavorite(false);
        } else {
          const text = await res.text();
          console.error("Remove favorite failed:", text);
        }
      }
    } catch (err) {
      console.error("Error while toggling favorite:", err);
    }
  };

  // 🎨 Kolory tła
  const mainType = props.types[0];
  const secondType = props.types[1] || mainType;

  const bgStyle = {
    background: `linear-gradient(135deg, ${typeColors[mainType]}, ${typeColors[secondType]})`,
  };

  return (
    <div className="main">
      <div className="content">
        <div className="left" style={bgStyle}>
          <div className="h1Fix">
            <h1>
              {props.name}
              {/* ⭐ Ikona ulubionych */}
              <span
                onClick={toggleFavorite}
                style={{
                  cursor: "pointer",
                  marginLeft: "10px",
                  fontSize: "1.2em",
                }}
              >
                {isFavorite ? "★" : "☆"}
              </span>
            </h1>
          </div>

          <p>{props.name}'s type is {props.types.join(", ")}.</p>
          <p>Its Pokédex ID is {props.id}.</p>

          {/* Evolution text logic */}
          {props.evolutionDetails.length > 0 && (
            <p>
              {props.evolution[0]} evolves into {props.evolution[1]}
              {props.evolutionDetails[0]?.level &&
                ` at level ${props.evolutionDetails[0].level}`
              }

              {props.evolution[2] && (
                <>
                  {`, then evolves into ${props.evolution[2]}`}
                  {props.evolutionDetails[1]?.level &&
                    ` at level ${props.evolutionDetails[1].level}`
                  }
                </>
              )}
              .
            </p>
          )}

          <div className="evolution">
            <h3>Evolution</h3>
            <Evolution types={props.types} evolution={props.evolution} />
          </div>
        </div>

        <div className="right" style={bgStyle}>
          <PokemonCard
            sprite={props.sprite}
            types={props.types}
            weight={props.weight}
            height={props.height}
          />
        </div>
      </div>
    </div>
  );
}
