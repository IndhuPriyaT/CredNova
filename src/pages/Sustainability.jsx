export default function Sustainability() {
  return (
    <>
      <div className="page-header">
        <h2>Ecological Impact</h2>
      </div>

      <div className="carbon-card">
          <div className="carbon-header">
              <h3>Carbon Footprint Level</h3>
              <span className="badge badge-low">Low</span>
          </div>
          <div className="carbon-meter">
              <div className="meter-bar low"></div>
          </div>
          <p style={{fontSize: '16px', color: 'var(--text-muted)', lineHeight: '1.6'}}>
            You're doing great! Your transaction history shows environmentally conscious choices, keeping your footprint low.
          </p>
      </div>

      <div className="rewards-banner">
          <ion-icon name="gift-outline"></ion-icon>
          <div className="rewards-text">
              <h4>Earn Eco-Rewards</h4>
              <p>Unlock premium perks and higher loan limits for sustainable behavior.</p>
          </div>
          <button className="btn-small">View Offers</button>
      </div>

      <h3 style={{fontSize: '22px', marginBottom: '24px'}}>Simple Tips to Improve</h3>
      
      <div className="insights-grid">
          <div className="insight-card">
              <div className="insight-icon" style={{background: 'rgba(0,82,255,0.1)', color: 'var(--primary-blue)'}}>
                <ion-icon name="bus-outline"></ion-icon>
              </div>
              <div className="insight-text">
                  <h4>Use public transport</h4>
                  <p>Take the bus or train to reduce emissions and boost your score.</p>
              </div>
          </div>
          <div className="insight-card">
              <div className="insight-icon" style={{background: 'rgba(0,82,255,0.1)', color: 'var(--primary-blue)'}}>
                <ion-icon name="flash-outline"></ion-icon>
              </div>
              <div className="insight-text">
                  <h4>Reduce electricity usage</h4>
                  <p>Pay utility bills reflecting lower energy consumption for bonuses.</p>
              </div>
          </div>
      </div>
    </>
  );
}
