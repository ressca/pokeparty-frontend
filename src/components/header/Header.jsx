import { useState } from "react";
import Search from "./Search";
import Login from "../login/Login";
import Register from "../login/Register";
import userAvatar from '../../assets/images/user.png';
import { useNavigate } from "react-router-dom";
import './Header.css';

export default function Header() {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);
  const navigateH = useNavigate();
  return (
    <div>
      <div className="headerContainer">
        <header>
          <h1 className="logoh1" onClick={() => navigateH("/")} style={{ cursor: "pointer" }}>PokeParty</h1>
          <div className="secondPart">
            <Search />
            <a href="#" className="yourCollection">Your Collection</a>

            <div className="userAvatar" onClick={() => setLoginOpen(true)}> 
              <img src={userAvatar} alt="User Avatar" className="avatarImage"/>
            </div>
          </div>
        </header>
      </div>

      {/* Popupy */}
      {isLoginOpen && (
        <Login
          onClose={() => setLoginOpen(false)}
          switchToRegister={() => {
            setLoginOpen(false);
            setRegisterOpen(true);
          }}
        />
      )}

      {isRegisterOpen && (
        <Register
          onClose={() => setRegisterOpen(false)}
          switchToLogin={() => {
            setRegisterOpen(false);
            setLoginOpen(true);
          }}
        />
      )}
    </div>
  );
}
