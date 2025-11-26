import { useEffect, useState } from "react";
import { fetchCurrentUser } from "../login/apiUser";
import './UserSettings.css';

export default function UserSettings({ onClose }) {
  const [userData, setUserData] = useState("");

  useEffect(() => {
  const token = localStorage.getItem("access_token");
  if (token) {
    fetchCurrentUser(token)
      .then(data => setUserData(data))
      .catch(err => console.error(err));
  }
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
            <button className="logoutSBtn" onClick={handleLogout}>Logout</button>
            <button className="closeSBtn" onClick={onClose}>Close</button>
        </div>
    </div>
  );
}
