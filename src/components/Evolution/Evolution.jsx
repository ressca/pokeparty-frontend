import { useEffect, useState } from "react";
import "./Evolution.css";
import { typeColors } from "../../utils";

export default function Evolution({ types, evolution }) {
  const [sprites, setSprites] = useState([]);

  useEffect(() => {
    if (!evolution || evolution.length === 0) return;

    const fetchSprites = async () => {
      const results = [];

      for (const name of evolution) {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const data = await res.json();

        results.push({
          name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
          img: data.sprites.other["official-artwork"].front_default
        });
      }

      setSprites(results);
    };

    fetchSprites();
  }, [evolution]);

  if (!types || types.length === 0) return null;

  const main = types[0];
  const second = types[1] || main;

  // Przyciemnij border, jeśli Pokémon ma tylko jeden typ
  const borderColor = (main === second) ? darkenColor(typeColors[main], 30) : typeColors[main];

  return (
    <div
      className="main-evo"
      style={{
        borderColor: borderColor,
        backgroundColor: typeColors[second],
      }}
    >
      <div className="evo-row">
        {sprites.map((p, index) => (
          <div className="evo-wrapper" key={index}>

            <div className="evo-item">
              <img src={p.img} alt={p.name} />
              <p>{p.name}</p>
            </div>

            {index < sprites.length - 1 && (
              <div className="arrow">
                <svg width="50" height="50" viewBox="0 0 24 24">
                  <path 
                    d="M5 12h14M13 5l7 7-7 7" 
                    stroke="#000" 
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Funkcja do przyciemnienia koloru
function darkenColor(color, percent) {
  const num = parseInt(color.slice(1),16),
        amt = Math.round(2.55 * percent),
        R = (num >> 16) - amt,
        G = (num >> 8 & 0x00FF) - amt,
        B = (num & 0x0000FF) - amt;
  return "#" + (
    0x1000000 +
    (R<255?R<0?0:R:255)*0x10000 +
    (G<255?G<0?0:G:255)*0x100 +
    (B<255?B<0?0:B:255)
  ).toString(16).slice(1);
}
