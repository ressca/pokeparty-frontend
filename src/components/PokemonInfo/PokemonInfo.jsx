import Evolution from "../Evolution/Evolution";
import PokemonCard from "../PokemonCard/PokemonCard";
import { typeColors } from "../../utils";
import "./PokemonInfo.css";

export default function PokemonInfo(props) {
  // główny typ
  const mainType = props.types[0];
  // drugi typ jeśli istnieje
  const secondType = props.types[1] || mainType;

  const bgStyle = {
    background: `linear-gradient(135deg, ${typeColors[mainType]}, ${typeColors[secondType]})`
  };

  return (
    <div className="main">
      <div className="content">
        <div className="left" style={bgStyle}>
          <div className="h1Fix">
            <h1>{props.name}</h1>
          </div>

          <p>{props.name}'s type is {props.types.join(", ")}</p>
          <p>It's Pokedex ID is {props.id}.</p>

          <div className="evolution">
            <h3>Evolution</h3>
            <Evolution />
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
