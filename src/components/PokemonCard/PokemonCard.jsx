import "./PokemonCard.css";
export default function PokemonCard(props) {
    return (
        <div className="main-card">
            <img className="card-img" src="" alt="" />

            <div className="type">
                <h6 className="text-card">Type</h6>
                <p className="text-card-data">TEST</p>
            </div>

            <div className="left-card"> 
                <h6 className="text-card">Height</h6>
                <p className="text-card-data">TEST</p>
            </div>

            <div className="right-card">
                <h6 className="text-card">Weight</h6>
                <p className="text-card-data">TEST</p>
            </div>
        </div>
    );
}