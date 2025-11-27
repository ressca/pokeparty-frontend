import { useState } from "react";
import { updateUser } from "./updateUser";
import { loginUser } from "../login/apiLoginRejestracja.js";
import PokemonAvatar from "./PokemonAvatar";
import './UserSettings.css';
import { useToast } from "../../context/ToastContext.jsx";
import { useAuth } from "../../context/AuthContext";

export default function UserUpdate({ userData, onClose, onUpdated }) {
  const [formData, setFormData] = useState({
    username: userData.username,
    email: userData.email,
    password: "",
    profile_pic_pokemon_id: userData.profile_pic_pokemon_id,
  });
  const { showToast } = useToast();
  const { token, login } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const dataToSend = {};

    // Only add fields that have values and are different from original data (optional logic)
    // Or simply: only add fields that are NOT empty strings.
    
    if (formData.username && formData.username.trim() !== "") {
        dataToSend.username = formData.username;
    }
    
    if (formData.email && formData.email.trim() !== "") {
        dataToSend.email = formData.email;
    }

    if (formData.password && formData.password.trim() !== "") {
        dataToSend.password = formData.password;
    }
    
    if (formData.profile_pic_pokemon_id) {
        dataToSend.profile_pic_pokemon_id = parseInt(formData.profile_pic_pokemon_id, 10);
    }

    const updated = await updateUser(token, dataToSend);
    if (updated.access_token) {
      login(updated.access_token);
    }

    showToast("User updated successfully!", "success");
    onUpdated();
    onClose();
  } catch (err) {
    console.error(err);
    showToast("Failed to update user data.", "error");
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
