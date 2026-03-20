import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      navigate('/consent');
    }, 1000);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="logo" style={{justifyContent: 'center', marginBottom: '30px'}}>
          <ion-icon name="shield-checkmark" class="logo-icon"></ion-icon>
          <h1>GigTrust</h1>
        </div>
        <h2 style={{fontSize: '28px', marginBottom: '12px'}}>Welcome Back</h2>
        <p style={{marginBottom: '40px', color: 'var(--text-muted)'}}>Sign in to view your real-time alternate credit scores.</p>
        
        <form onSubmit={handleLogin} style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
          <input type="email" placeholder="Email Address" required className="input-field" defaultValue="user@example.com" />
          <input type="password" placeholder="Password" required className="input-field" defaultValue="password" />
          <button type="submit" className="btn btn-primary" style={{marginTop: '10px'}}>
            {loading ? <span className="spin"><ion-icon name="sync-outline"></ion-icon></span> : "Secure Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
