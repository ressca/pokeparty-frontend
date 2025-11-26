import './Register.css';
import { registerUser } from './apiLoginRejestracja.js';
import { useState } from "react";
export default function Register({ onClose, switchToLogin }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pass2, setPass2] = useState("");

  const handleRegister = async () => {
    if (password !== pass2) {
      alert("Passwords do not match");
      return;
    }

    try {
      await registerUser(username, email, password);

      alert("Registered successfully!");
      switchToLogin(); 
    } catch (err) {
      alert("Register failed");
    }
  };

  return (
    <div className="loginOverlay">
      <div className="loginForm">
        <h2>Register</h2>

        <input placeholder="Username" onChange={e => setUsername(e.target.value)} />
        <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
        <input type="password" placeholder="Confirm Password" onChange={e => setPass2(e.target.value)} />

        <button className='loginBtn' onClick={handleRegister}>Register</button>
        <button className='closeBtn' onClick={onClose}>Close</button>

        <div className="switchText">
          Already have an account?{" "}
          <span className="linkRegForm" onClick={switchToLogin}>Login</span>
        </div>
      </div>
    </div>
  );
}
