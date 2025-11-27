import { useState } from "react";
import Search from "./Search";
import Login from "../login/Login";
import Register from "../login/Register";
import userAvatar from '../../assets/images/user.png';
import './Header.css';
import { useNavigate } from "react-router-dom";
import { fetchCurrentUser } from "../login/apiUser";
import { useEffect } from "react";
import UserSettings from "../UserSettings/UserSettings";
import FavoritesPage from "../../pages/FavoritesPage/FavoritesPage";
import { useAuth } from "../../context/AuthContext";

export default function Header() {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);
  const navigate = useNavigate();
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const [username, setUsername] = useState("");
  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      fetchCurrentUser(token)
        .then(data => {
          setUsername(data.username);
        })
        .catch(err => console.error(err));
    } else {
      setUsername("");
    }
  }, [token]);
  
  return (
    <div>
      <div className="headerContainer">
        <header>
          <h1 className="logoh1" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>PokeParty</h1>
          <div className="secondPart">
            <Search />
            <a href="#" className="yourCollection" onClick={(e) => { e.preventDefault(); navigate("/leaderboard"); }}>Leaderboard</a>
            <a href="#" className="yourCollection" onClick={(e) => { e.preventDefault(); navigate("/favorites"); }}>Favorites</a>
            

            <div className="userAvatar" onClick={() => {
              if(token) {
                  setSettingsOpen(true);
                } else {
                  setLoginOpen(true);
                }
                }}>
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

      {isSettingsOpen && (
      <UserSettings onClose={() => setSettingsOpen(false)} />
      )}
    </div>
  );
}
