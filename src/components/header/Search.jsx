import './Search.css';
import searchSymbol from '../../assets/images/searchSymbol.png';
export default function Search() {
    return (
            <div className="searchBar">
                <label>
                <input type="text" placeholder="Search Pokémon..." className='search-input'/>
                <img src={searchSymbol} alt="Search Icon" className='searchSymbol'/>
                </label>
            </div>
    )
}