import "./PokemonCard.css";
import { typeColors } from "../../utils";

export default function PokemonCard({ sprite, types, weight, height }) {
  const mainType = types[0];
  const secondType = types[1] || mainType;

  const typeStyle = {
    background: `linear-gradient(135deg, ${typeColors[mainType]}, ${typeColors[secondType]})`
  };

  const cardBgStyle = {
    background: `linear-gradient(135deg, ${shadeColor(typeColors[mainType], -25)}, ${shadeColor(typeColors[secondType], -25)})`
  };

  return (
    <div className="main-card" style={cardBgStyle}>
      <img className="card-img" src={sprite} alt="pokemon" />

      <div className="type" style={typeStyle}>
        <h6 className="text-card">Type</h6>
        <p className="text-card-data">{types.join(", ")}</p>
      </div>

      <div className="left-card" style={typeStyle}>
        <h6 className="text-card">Height</h6>
        <p className="text-card-data">{height} m</p>
      </div>

      <div className="right-card" style={typeStyle}>
        <h6 className="text-card">Weight</h6>
        <p className="text-card-data">{weight} kg</p>
      </div>
    </div>
  );
}

// funkcja do przyciemnienia/rozjaśnienia koloru
function shadeColor(color, percent) {
  // color w formacie "#RRGGBB"
  const num = parseInt(color.slice(1),16),
        amt = Math.round(2.55 * percent),
        R = (num >> 16) + amt,
        G = (num >> 8 & 0x00FF) + amt,
        B = (num & 0x0000FF) + amt;
  return "#" + (
    0x1000000 + 
    (R<255?R<0?0:R:255)*0x10000 + 
    (G<255?G<0?0:G:255)*0x100 + 
    (B<255?B<0?0:B:255)
  ).toString(16).slice(1);
}
