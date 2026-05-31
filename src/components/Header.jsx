import { signOut } from 'firebase/auth';
import { auth } from '../firebase.js';

function Header({ user }) {
  const handleLogout = () => signOut(auth);

  return (
    <header className="header">
      <div className="header-left">
        <span className="header-logo">&#x1F1E9;&#x1F1EA;</span>
        <span className="header-title">Deutsch Tracker</span>
        <span className="header-badge">Zero → B2</span>
      </div>
      <div className="header-right">
        {user.photoURL && (
          <img src={user.photoURL} alt={user.displayName} className="user-avatar" />
        )}
        <span className="user-name">{user.displayName}</span>
        <button className="logout-btn" onClick={handleLogout}>Abmelden</button>
      </div>
    </header>
  );
}

export default Header;
