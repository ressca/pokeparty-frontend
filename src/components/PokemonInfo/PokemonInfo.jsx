import Evolution from "../Evolution/Evolution";
import PokemonCard from "../PokemonCard/PokemonCard";
import "./PokemonInfo.css";
export default function PokemonInfo(props) {
  return (
    <div className="main">
      <div className="content">
        <div className="left">
          <div className="h1Fix"><h1>{props.name}Bulbasaur</h1></div>
            <p>{props.name}'s type is {props.type}</p>
            <p>It's Pokedex id is {props.id}.</p>

            <div className="evolution">
                <h3>Evolution</h3>
                <Evolution />
            </div>
        </div>

        <div className="right">
            <PokemonCard />
        </div>
      </div>

    </div>
  );
}
