import Search from "./Search"
import './Header.css';
export default function Header() {
    return (
    <div className="headerContainer">
        <header>
            <h1 class="logoh1">PokeParty</h1>
                
            <div className="secondPart">
                <Search />
                <a href="#" className="yourCollection">Your Collection</a>

                    <div className="userAvatar"> {/*na razie nie można kliknąć, potencjalnie tu będą ustawienia */}
                        <img src="src\assets\images\user.png" alt="User Avatar" className="avatarImage"/>
                    </div>

            </div>
        </header>
    </div>
    )
}