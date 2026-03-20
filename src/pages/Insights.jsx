export default function Insights() {
  return (
    <>
      <div className="page-header">
        <h2>Score Insights</h2>
      </div>

      <div style={{marginBottom: '30px'}}>
        <h3 style={{fontSize: '22px', marginBottom: '16px'}}>Why this score?</h3>
        <p style={{color: 'var(--text-muted)', fontSize: '16px'}}>A transparent look into exactly what financial behaviors are driving your current alternate credit score.</p>
      </div>

      <div className="insights-grid">
          <div className="insight-card positive">
              <div className="insight-icon"><ion-icon name="cash-outline"></ion-icon></div>
              <div className="insight-text">
                  <h4>Regular income detected</h4>
                  <p>Monthly salary deposits consistently on time.</p>
              </div>
          </div>
          <div className="insight-card positive">
              <div className="insight-icon"><ion-icon name="swap-horizontal-outline"></ion-icon></div>
              <div className="insight-text">
                  <h4>Consistent transactions</h4>
                  <p>Healthy daily spending patterns recognized.</p>
              </div>
          </div>
          <div className="insight-card neutral">
              <div className="insight-icon"><ion-icon name="pulse-outline"></ion-icon></div>
              <div className="insight-text">
                  <h4>Spending spikes</h4>
                  <p>Slight increase in weekend entertainment expenses.</p>
              </div>
          </div>
          <div className="insight-card positive">
              <div className="insight-icon"><ion-icon name="planet-outline"></ion-icon></div>
              <div className="insight-text">
                  <h4>Low carbon footprint bonus</h4>
                  <p>Frequent public transit usage detected.</p>
              </div>
          </div>
      </div>
    </>
  );
}
