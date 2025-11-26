import "./PokemonCard.css";

export default function PokemonCard({ sprite, types, weight, height }) {
  return (
    <div className="main-card">
      <img className="card-img" src={sprite} alt="pokemon" />

      <div className="type">
        <h6 className="text-card">Type</h6>
        <p className="text-card-data">{types.join(", ")}</p>
      </div>

      <div className="left-card">
        <h6 className="text-card">Height</h6>
        <p className="text-card-data">{height} m</p>
      </div>

      <div className="right-card">
        <h6 className="text-card">Weight</h6>
        <p className="text-card-data">{weight} kg</p>
      </div>
    </div>
  );
}
