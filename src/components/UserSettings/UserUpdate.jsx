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
    console.log("Użytkownik zaktualizowany:", updated);
    const data = await loginUser(formData.username, formData.password);
    localStorage.setItem("access_token", data.access_token);
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
        <h2>Aktualizuj użytkownika</h2>

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
            <label htmlFor="password">Nowe hasło:</label>
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
            <label htmlFor="profile_pic_pokemon_id">ID Pokemona (avatar):</label>
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
            <button type="submit" className="saveBtn">Zapisz</button>
            <button type="button" onClick={onClose} className="cancelBtn">Anuluj</button>
          </div>

        </form>
      </div>
    </div>
  );
}
