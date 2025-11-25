import './PokemonOfTheDay.css';
import tempPic from '../../assets/images/tempPic.png';
export default function PokemonOfTheDay() {
    return (
                <section className="pokemonOfTheDaySection">
                    <div className="pokemonOfTheDayContainer">
                        <img src={tempPic} alt="Pokemon of the Day" className='pokemonPicture'/>
                        <div className="pokemonOfTheDayInfo">
                            <h2 className="pokemonName">Pikachu</h2>
                            <p className="pokemonType">Type: Electric</p>
                            <p className="pokemonDescription">
                                Pikachu is an Electric-type Pokémon known for its yellow fur and lightning bolt-shaped tail. It is the mascot of the Pokémon franchise and is loved by fans worldwide.
                            </p>
                        </div>
                    </div>
                </section>
            )
}