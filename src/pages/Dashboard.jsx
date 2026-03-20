import { useEffect, useState } from 'react';

// Mock Aggregated Data (Real-time Bank Statement Simulation)
const SPENDING_DATA = [
  { day: 'Mon', amount: 45, category: 'Groceries' },
  { day: 'Tue', amount: 120, category: 'Utilities' },
  { day: 'Wed', amount: 15, category: 'Transport' },
  { day: 'Thu', amount: 80, category: 'Dining' },
  { day: 'Fri', amount: 210, category: 'Entertainment' },
  { day: 'Sat', amount: 40, category: 'Shopping' },
  { day: 'Sun', amount: 25, category: 'Transport' },
];

function calculateDynamicScore(transactions) {
  const totalSpent = transactions.reduce((acc, curr) => acc + curr.amount, 0);
  
  // Discipline drops if spending is excessively high in one week
  const spending_discipline = Math.max(0, 100 - (totalSpent / 15)); 
  
  // Consistency checks daily activity spread
  const transaction_consistency = (transactions.length / 7) * 100; 
  
  // Fixed income base for the prototype
  const income_stability = 90; 
  
  // Eco-bonus based on green categories
  const eco_transactions = transactions.filter(t => t.category === 'Transport').length;
  const carbon_footprint_bonus = Math.min(50, eco_transactions * 20); 

  const financial_score = (transaction_consistency * 3) + (income_stability * 3) + (spending_discipline * 3);
  const sustainability_score = carbon_footprint_bonus * 2;
  
  return {
    score: Math.round(financial_score + sustainability_score),
    financialPercent: Math.round((financial_score / 900) * 100),
    ecoPoints: Math.round(sustainability_score)
  };
}

export default function Dashboard() {
  const [metrics, setMetrics] = useState({ score: 0, financialPercent: 0, ecoPoints: 0 });

  useEffect(() => {
    // 1. Calculate Score based on everyday spending data
    const calculated = calculateDynamicScore(SPENDING_DATA);
    setMetrics(calculated);

    // 2. Animate the circular SVG score path
    const timer = setTimeout(() => {
      const progressPath = document.querySelector('.circle-progress');
      if (progressPath) {
        const percent = (calculated.score / 1000) * 100;
        progressPath.style.strokeDasharray = `${percent}, 100`;
      }
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  const maxAmount = Math.max(...SPENDING_DATA.map(d => d.amount));

  return (
    <>
      <div className="page-header">
        <h2>Overview</h2>
        <div style={{display: 'flex', gap: '20px', alignItems: 'center'}}>
          <span style={{color: 'var(--text-muted)', fontWeight: 600}}>Aggregator synced: Just now</span>
          <ion-icon name="notifications-outline" style={{fontSize: '28px'}}></ion-icon>
        </div>
      </div>

      <div className="score-card">
        <div className="score-circle">
            <svg className="score-svg" viewBox="0 0 36 36">
                <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="circle-progress" strokeDasharray="0, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            </svg>
            <div className="score-value">
                <span className="score-number">{metrics.score}</span>
                <span className="score-max">/1000</span>
            </div>
        </div>
        
        <div className="breakdown-section">
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
              <h3>Score Breakdown</h3>
              <div style={{display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700', color: 'var(--primary-green)', background: 'var(--primary-green-light)', padding: '8px 16px', borderRadius: '24px'}}>
                  <span style={{width: '10px', height: '10px', borderRadius: '50%', background: 'var(--primary-green)', boxShadow: '0 0 8px var(--primary-green)'}}></span> 
                  Dynamic Score Active
              </div>
            </div>

            <div className="breakdown-cards">
                <div className="breakdown-card blue">
                    <div className="card-icon"><ion-icon name="wallet-outline"></ion-icon></div>
                    <div style={{display: 'flex', flexDirection: 'column', gap: '4px'}}>
                        <span className="card-title">Financial Behavior</span>
                        <span className="card-value">{metrics.financialPercent}%</span>
                    </div>
                </div>
                <div className="breakdown-card green">
                    <div className="card-icon"><ion-icon name="leaf-outline"></ion-icon></div>
                    <div style={{display: 'flex', flexDirection: 'column', gap: '4px'}}>
                        <span className="card-title">Sustainability Bonus</span>
                        <span className="card-value">+{metrics.ecoPoints} pts</span>
                    </div>
                </div>
            </div>

            <div className="toast-message">
                <ion-icon name="trending-up-outline"></ion-icon>
                <span>Score generated in real-time from everyday spending</span>
            </div>
        </div>
      </div>

      {/* Everyday Spending Habits Graph */}
      <div style={{ background: 'var(--white)', padding: '30px', borderRadius: '32px', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-color)' }}>
        <h3 style={{ marginBottom: '8px', fontSize: '22px' }}>Everyday Spending Habits</h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: '40px', fontSize: '15px' }}>Tracked automatically via Account Aggregator</p>
        
        <div style={{ display: 'flex', alignItems: 'flex-end', height: '220px', gap: '20px', paddingBottom: '10px', borderBottom: '1px solid var(--border-color)' }}>
          {SPENDING_DATA.map((data, index) => {
            const heightPercent = Math.max(10, (data.amount / maxAmount) * 100);
            const isSpike = data.amount > 150;
            return (
              <div key={index} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                <div 
                  style={{ 
                    width: '100%', 
                    height: `${heightPercent}%`, 
                    background: isSpike ? 'rgba(245,158,11,0.85)' : 'var(--primary-blue)', 
                    borderRadius: '12px 12px 0 0',
                    transition: 'height 1s cubic-bezier(0.1, 0.8, 0.2, 1)',
                    position: 'relative',
                    cursor: 'pointer'
                  }}
                  title={`$${data.amount} on ${data.category}`}
                >
                  <span style={{ position: 'absolute', top: '-30px', left: '50%', transform: 'translateX(-50%)', fontSize: '13px', fontWeight: 800, color: 'var(--text-main)'}}>${data.amount}</span>
                </div>
                <span style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: 600 }}>{data.day}</span>
              </div>
            );
          })}
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '24px', color: 'var(--text-muted)', fontSize: '14px', fontWeight: 500 }}>
          <span>Linked Accounts: Checking (*1234), Credit Card (*9876)</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{width: 12, height: 12, background: 'rgba(245,158,11,0.85)', borderRadius: '4px'}}></div> 
            High Spending Spikes (Lowers discipline score)
          </span>
        </div>
      </div>
    </>
  );
}
