import { useState, useEffect } from "react";
import './Register.css';
import { registerUser } from './apiLoginRejestracja.js';
import { useToast } from '../../context/ToastContext.jsx';

export default function Register({ onClose, switchToLogin }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pass2, setPass2] = useState("");
  const { showToast } = useToast();

  useEffect(() => {
    document.body.classList.add("register-page");
    return () => {
      document.body.classList.remove("register-page");
    };
  }, []);

  const handleRegister = async () => {
    if (password !== pass2) {
      showToast("Passwords do not match", "error");
      return;
    }

    try {
      await registerUser(username, email, password);

      showToast("Registered successfully!", "success");
      switchToLogin(); 
    } catch (err) {
      showToast("Register failed", "error");
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
