import Evolution from "../Evolution/Evolution";
import PokemonCard from "../PokemonCard/PokemonCard";
import { typeColors } from "../../utils";
import "./PokemonInfo.css";

export default function PokemonInfo(props) {

  const mainType = props.types[0];
  const secondType = props.types[1] || mainType;

  const bgStyle = {
    background: `linear-gradient(135deg, ${typeColors[mainType]}, ${typeColors[secondType]})`
  };

  // 🔹 Generowanie tekstu ewolucji
  const evolutionText = () => {
    if (!props.evolutionDetails || props.evolutionDetails.length === 0) return "";

    let text = "";
    for (let i = 0; i < props.evolutionDetails.length; i++) {
      const evo = props.evolutionDetails[i];
      text += `${evo.from} evolves to ${evo.to}`;
      if (evo.level) text += ` at lvl ${evo.level}`;
      if (i < props.evolutionDetails.length - 1) text += " → then ";
    }
    return text;
  };

  return (
    <div className="main">
      <div className="content">
        
        <div className="left" style={bgStyle}>
          <div className="h1Fix">
            <h1>{props.name}</h1>
          </div>

          <p>{props.name}'s type is {props.types.join(", ")}.</p>
          <p>Its Pokédex ID is {props.id}.</p>

          {/* Tekst ewolucji */}
          <p>{evolutionText()}</p>

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
