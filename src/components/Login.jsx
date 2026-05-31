import { useState } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase.js';

function Login() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      await signInWithPopup(auth, provider);
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">
          <span className="logo-de">DE</span>
          <span className="logo-flag">&#x1F1E9;&#x1F1EA;</span>
        </div>
        <h1>Deutsch Tracker</h1>
        <p className="login-subtitle">Zero &rarr; B2 in 24 Wochen</p>
        <div className="login-divider"></div>
        <p className="login-desc">Verfolge deinen Fortschritt auf dem Weg zur deutschen Sprachkompetenz.</p>
        {error && <div className="error-msg">{error}</div>}
        <button
          className="google-btn"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <span>Laden...</span>
          ) : (
            <>
              <svg width="20" height="20" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.6 32.8 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 7.9 2.9l5.7-5.7C34.1 6.8 29.3 5 24 5 12.9 5 4 13.9 4 25s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.6-.4-3.9z"/>
                <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.5 15.6 18.9 12 24 12c3.1 0 5.8 1.1 7.9 2.9l5.7-5.7C34.1 6.8 29.3 5 24 5 16.3 5 9.6 9 6.3 14.7z"/>
                <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.3 35.2 26.8 36 24 36c-5.3 0-9.7-3.5-11.3-8.2l-6.5 5C9.5 40.1 16.3 44 24 44z"/>
                <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.9 2.5-2.5 4.6-4.6 6l6.2 5.2C42 35.4 44 30.6 44 25c0-1.3-.1-2.6-.4-3.9z"/>
              </svg>
              Mit Google anmelden
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default Login;
