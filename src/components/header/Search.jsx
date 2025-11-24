import './Search.css';
export default function Search() {
    return (
            <div className="searchBar">
                <label>
                <input type="text" placeholder="Search Pokémon..." className='search-input'/>
                <img src="src\assets\images\search-interface-symbol.png" alt="Search Icon" className='searchSymbol'/>
                </label>
            </div>
    )
}