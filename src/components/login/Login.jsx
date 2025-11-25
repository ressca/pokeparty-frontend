import './login.css';

export default function Login({ onClose, switchToRegister }) {
  return (
    <div className="loginOverlay">
      <div className="loginForm">
        <h2>Login</h2>
        <input type="text" placeholder="Email" />
        <input type="password" placeholder="Password" />

        <button className='loginBtn'>Login</button>
        <button className='closeBtn' onClick={onClose}>Close</button>
            <div className="switchText">
                Don't have an account?{" "}
            <span className="linkRegForm" onClick={switchToRegister}>Register</span>
            </div>
      </div>
    </div>
  );
}
