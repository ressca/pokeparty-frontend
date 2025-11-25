import './Register.css';

export default function Register({ onClose, switchToLogin }) {
  return (
    <div className="loginOverlay">
      <div className="loginForm">
        <h2>Register</h2>
        <input type="text" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <input type="password" placeholder="Confirm Password" />

        <button className='loginBtn'>Register</button>
        <button className='closeBtn' onClick={onClose}>Close</button>
        <div className="switchText">
          Already have an account?{" "}
          <span className="linkRegForm" onClick={switchToLogin}>Login</span>
        </div>
      </div>
    </div>
  );
}
