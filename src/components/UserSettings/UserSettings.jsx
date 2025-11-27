import { useEffect, useState } from "react";
import { fetchCurrentUser } from "../login/apiUser";
import UserUpdate from "./UserUpdate";
import './UserSettings.css';

export default function UserSettings({ onClose }) {
  const [userData, setUserData] = useState("");
  const [editing, setEditing] = useState(false);

  const loadUser = () => {
    const token = localStorage.getItem("access_token");
    if (token) {
      fetchCurrentUser(token)
        .then(data => setUserData(data))
        .catch(err => console.error(err));
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setUserData("");
    onClose();
    window.location.reload();
  };

  return (
    <div className="settingsOverlay">
      <div className="settingsForm">
        <h2>User Settings</h2>

        <p><strong>Username:</strong> {userData.username}</p>
        <p><strong>Email:</strong> {userData.email}</p>
        <p><strong>Zdjęcie profilowe:</strong> {userData.profile_pic_pokemon_id}</p>
        
        <button className="closeSBtn" onClick={onClose}>Close</button>
        <button className="editSBtn" onClick={() => setEditing(true)}>Edit</button>
        <button className="logoutSBtn" onClick={handleLogout}>Logout</button>
      </div>

      {editing && (
        <UserUpdate
          userData={userData}
          onClose={() => setEditing(false)}
          onUpdated={loadUser}
        />
      )}
    </div>
  );
}
