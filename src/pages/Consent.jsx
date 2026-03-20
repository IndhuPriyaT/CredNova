import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Consent() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleConsent = () => {
    setLoading(true);
    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="auth-container">
      <div className="auth-card" style={{maxWidth: '600px'}}>
        <div style={{fontSize: '64px', color: 'var(--primary-blue)', marginBottom: '20px'}}>
          <ion-icon name="shield-checkmark"></ion-icon>
        </div>
        <h2 style={{fontSize: '32px', marginBottom: '16px'}}>Link Your Financial Data</h2>
        <p style={{marginBottom: '32px', color: 'var(--text-muted)', fontSize: '16px', lineHeight: '1.6'}}>
          CredNova uses Account Aggregators to securely fetch your real-time bank statements. 
          Your data is entirely encrypted, never stored permanently, and only analyzed to build your dynamic alternate credit score.
        </p>
        
        <div style={{background: 'var(--bg-color)', padding: '24px', borderRadius: '16px', textAlign: 'left', marginBottom: '32px'}}>
          <h4 style={{marginBottom: '12px', fontSize: '18px'}}>What we process:</h4>
          <ul style={{listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', color: 'var(--text-muted)'}}>
            <li><ion-icon name="checkmark-circle" style={{color: 'var(--primary-green)', marginRight: '8px', verticalAlign: 'middle'}}></ion-icon> Transaction Consistency</li>
            <li><ion-icon name="checkmark-circle" style={{color: 'var(--primary-green)', marginRight: '8px', verticalAlign: 'middle'}}></ion-icon> Income Stability</li>
            <li><ion-icon name="checkmark-circle" style={{color: 'var(--primary-green)', marginRight: '8px', verticalAlign: 'middle'}}></ion-icon> Spending Discipline</li>
            <li><ion-icon name="checkmark-circle" style={{color: 'var(--primary-green)', marginRight: '8px', verticalAlign: 'middle'}}></ion-icon> Carbon Footprint Analysis</li>
          </ul>
        </div>

        <button onClick={handleConsent} className="btn btn-primary" style={{padding: '20px', fontSize: '18px'}}>
          {loading ? <span className="spin"><ion-icon name="sync-outline"></ion-icon></span> : "I Consent — Connect via Aggregator"}
        </button>
        <button className="btn btn-secondary" onClick={() => navigate('/')}>
          Cancel
        </button>
      </div>
    </div>
  );
}
