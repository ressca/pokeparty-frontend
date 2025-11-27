import './Login.css';
import { loginUser } from './apiLoginRejestracja.js';
import { useState } from "react";
import { useAuth } from '../../context/AuthContext';

export default function Login({ onClose, switchToRegister }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      const data = await loginUser(username, password);

      login(data.access_token);

      onClose(); 
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="loginOverlay">
      <div className="loginForm">
        <h2>Login</h2>

        <input 
          type="text" 
          placeholder="Username" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input 
          type="password" 
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className='loginBtn' onClick={handleLogin}>
          Login
        </button>
        <button className='closeBtn' onClick={onClose}>Close</button>

        <div className="switchText">
          Don't have an account?{" "}
          <span className="linkRegForm" onClick={switchToRegister}>Register</span>
        </div>
      </div>
    </div>
  );
}