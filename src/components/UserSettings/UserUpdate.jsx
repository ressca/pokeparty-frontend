import { useState } from "react";
import { updateUser } from "./updateUser";
import { loginUser } from "../login/apiLoginRejestracja.js";
import PokemonAvatar from "./PokemonAvatar";
import './UserSettings.css';

export default function UserUpdate({ userData, onClose, onUpdated }) {
  const [formData, setFormData] = useState({
    username: userData.username,
    email: userData.email,
    password: "",
    profile_pic_pokemon_id: userData.profile_pic_pokemon_id,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const token = localStorage.getItem("access_token");

    const dataToSend = { ...formData };
    if (!dataToSend.password) delete dataToSend.password;

    const updated = await updateUser(token, dataToSend);
    if (updated.access_token) {
      localStorage.setItem("access_token", updated.access_token);
    }

    onUpdated();
    onClose();
  } catch (err) {
    console.error(err);
    alert("Nie udało się zaktualizować danych.");
  }
};



  return (
    <div className="settingsOverlay">
      <div className="settingsForm">
        <h2>Update user</h2>

        <form onSubmit={handleSubmit} className="userUpdateForm">

          <div className="formGroup">
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              className="formInput"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div className="formGroup">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              className="formInput"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="formGroup">
            <label htmlFor="password">New password:</label>
            <input
              id="password"
              className="formInput"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="formGroup">
            <label htmlFor="profile_pic_pokemon_id">Pokemon ID (avatar):</label>
            <input
              id="profile_pic_pokemon_id"
              className="formInput"
              name="profile_pic_pokemon_id"
              type="number"
              value={formData.profile_pic_pokemon_id}
              onChange={handleChange}
            />
          </div>
          <PokemonAvatar id={formData.profile_pic_pokemon_id} size={80} showName={true}/>
          <div className="formButtons">
            <button type="submit" className="saveBtn">Save</button>
            <button type="button" onClick={onClose} className="cancelBtn">Cancel</button>
          </div>

        </form>
      </div>
    </div>
  );
}
