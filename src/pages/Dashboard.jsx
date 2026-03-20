import { useEffect, useState, useRef } from 'react';

export default function Dashboard() {
  const [inputs, setInputs] = useState({
    incomeStability: 50,
    transactionConsistency: 50,
    spendingDiscipline: 40,
    ecoBonus: 40
  });

  const [metrics, setMetrics] = useState({ score: 0, financialPercent: 0, ecoPoints: 0 });
  const [animatedScore, setAnimatedScore] = useState(0);
  const [toast, setToast] = useState({ visible: false, message: '' });

  const prevScoreRef = useRef(0);
  const prevInputsRef = useRef(inputs);

  useEffect(() => {
    const financial_score = (inputs.transactionConsistency * 3) + (inputs.incomeStability * 3) + (inputs.spendingDiscipline * 3);
    const sustainability_score = (inputs.ecoBonus / 100) * 50 * 2; 
    
    const newScore = Math.floor(financial_score + sustainability_score);
    
    if (prevScoreRef.current > 0 && newScore > prevScoreRef.current) {
        let message = "Your score improved due to positive financial behavior!";
        
        if (inputs.incomeStability > prevInputsRef.current.incomeStability) {
            message = "Your score improved due to consistent income patterns";
        } else if (inputs.spendingDiscipline > prevInputsRef.current.spendingDiscipline) {
            message = "Your score improved due to better spending discipline";
        } else if (inputs.transactionConsistency > prevInputsRef.current.transactionConsistency) {
            message = "Your score improved due to increased transaction activity";
        }

        setToast({ visible: true, message });
        
        const hideTimer = setTimeout(() => {
          setToast(t => ({ ...t, visible: false }));
        }, 4000);
        return () => clearTimeout(hideTimer);
    }
    
    prevScoreRef.current = newScore;
    prevInputsRef.current = inputs;

    setMetrics({
      score: newScore,
      financialPercent: Math.round((financial_score / 900) * 100),
      ecoPoints: Math.round(sustainability_score)
    });
  }, [inputs]);

  useEffect(() => {
    let startTimestamp = null;
    const duration = 1200; 
    const initialScore = animatedScore;
    const targetScore = metrics.score;

    if (initialScore === targetScore) return;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setAnimatedScore(Math.floor(easeOut * (targetScore - initialScore) + initialScore));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);

    const progressPath = document.querySelector('.circle-progress');
    if (progressPath) {
      const percent = (targetScore / 1000) * 100;
      progressPath.style.strokeDasharray = `${percent}, 100`;
    }
  }, [metrics.score]);

  const baseData = [
    { day: 'Mon', baseAmt: 45, category: 'Groceries' },
    { day: 'Tue', baseAmt: 120, category: 'Utilities' },
    { day: 'Wed', baseAmt: 15, category: 'Transport' },
    { day: 'Thu', baseAmt: 80, category: 'Dining' },
    { day: 'Fri', baseAmt: 210, category: 'Entertainment' },
    { day: 'Sat', baseAmt: 40, category: 'Shopping' },
    { day: 'Sun', baseAmt: 25, category: 'Transport' },
  ];

  const dynamicSpending = baseData.map(d => {
    const multiplier = 1 + ((100 - inputs.spendingDiscipline) / 30); 
    const newAmt = Math.round(d.baseAmt * (['Fri', 'Sat', 'Sun'].includes(d.day) ? multiplier : 1));
    return { ...d, amount: newAmt };
  });

  const maxAmount = Math.max(...dynamicSpending.map(d => d.amount), 300);

  return (
    <>
      <div className="page-header" style={{ marginBottom: '24px' }}>
        <h2>Dashboard</h2>
        <div style={{display: 'flex', gap: '20px', alignItems: 'center'}}>
          <span style={{color: 'var(--text-muted)', fontWeight: 600}}>Mode: Prototype Preview</span>
          <ion-icon name="hardware-chip-outline" style={{fontSize: '28px', color: 'var(--primary-blue)'}}></ion-icon>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '30px', marginBottom: '40px' }}>
        
        {/* Left Col: Real-time Score Card */}
        <div className="score-card" style={{ margin: 0, flexDirection: 'column', gap: '30px', alignItems: 'stretch' }}>
            <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
                <div className="score-circle">
                    <svg className="score-svg" viewBox="0 0 36 36">
                        <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        <path className="circle-progress" strokeDasharray="0, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    </svg>
                    <div className="score-value">
                        <span className="score-number">{animatedScore}</span>
                        <span className="score-max">/1000</span>
                    </div>
                </div>
                
                <div className="breakdown-section" style={{ flex: 1 }}>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
                      <h3>Breakdown</h3>
                      <div style={{display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700', color: 'var(--primary-blue)', background: 'rgba(0,82,255,0.1)', padding: '6px 12px', borderRadius: '24px', fontSize: '13px'}}>
                          <span style={{width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary-blue)', boxShadow: '0 0 8px var(--primary-blue)'}}></span> 
                          {animatedScore >= 700 ? "Good" : animatedScore >= 500 ? "Average" : "Poor"}
                      </div>
                    </div>

                    <div className="breakdown-cards" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'var(--bg-color)', borderRadius: '12px' }}>
                            <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Financial Behavior</span>
                            <span style={{ color: 'var(--text-main)', fontWeight: 800, fontSize: '18px' }}>{metrics.financialPercent}%</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'var(--primary-green-light)', borderRadius: '12px' }}>
                            <span style={{ color: 'var(--primary-green)', fontWeight: 600 }}>Sustainability Bonus</span>
                            <span style={{ color: 'var(--primary-green)', fontWeight: 800, fontSize: '18px' }}>+{metrics.ecoPoints}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Dynamic Notification Toast */}
            <div style={{ 
                background: 'rgba(0,192,127,0.1)', color: 'var(--primary-green)', 
                padding: '16px 24px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '12px', 
                fontSize: '15px', fontWeight: 600,
                opacity: toast.visible ? 1 : 0, transform: toast.visible ? 'translateY(0)' : 'translateY(10px)',
                transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)', zIndex: 10
            }}>
                <ion-icon name="arrow-up-circle" style={{ fontSize: '24px' }}></ion-icon>
                <span>{toast.message}</span>
            </div>
        </div>

        {/* Right Col: Interactive Button Transformations */}
        <div style={{ background: 'var(--bg-color)', borderRadius: '32px', padding: '30px' }}>
            <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ion-icon name="color-wand-outline" style={{ fontSize: '24px', color: 'var(--text-main)' }}></ion-icon>
                <h3 style={{ fontSize: '20px' }}>Simulate Upgrades</h3>
            </div>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '24px', lineHeight: 1.5 }}>
                Click below to simulate a gig worker's journey milestones and watch the behavioral engine immediately upgrade the score.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <button 
                  onClick={() => setInputs(prev => ({...prev, incomeStability: Math.min(100, prev.incomeStability + 25)}))}
                  className="btn btn-secondary" 
                  style={{ justifyContent: 'flex-start', padding: '16px 24px', borderRadius: '16px', gap: '16px', opacity: inputs.incomeStability >= 100 ? 0.5 : 1, cursor: inputs.incomeStability >= 100 ? 'not-allowed' : 'pointer' }}
                  disabled={inputs.incomeStability >= 100}
                >
                    <div style={{ background: 'rgba(0,82,255,0.1)', color: 'var(--primary-blue)', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <ion-icon name="cash-outline" style={{fontSize: '20px'}}></ion-icon>
                    </div>
                    <span style={{ fontSize: '15px', color: 'var(--text-main)' }}>Improve Income Stability</span>
                </button>
                
                <button 
                  onClick={() => setInputs(prev => ({...prev, spendingDiscipline: Math.min(100, prev.spendingDiscipline + 30)}))}
                  className="btn btn-secondary" 
                  style={{ justifyContent: 'flex-start', padding: '16px 24px', borderRadius: '16px', gap: '16px', opacity: inputs.spendingDiscipline >= 100 ? 0.5 : 1, cursor: inputs.spendingDiscipline >= 100 ? 'not-allowed' : 'pointer' }}
                  disabled={inputs.spendingDiscipline >= 100}
                >
                    <div style={{ background: 'rgba(0,192,127,0.1)', color: 'var(--primary-green)', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <ion-icon name="pulse-outline" style={{fontSize: '20px'}}></ion-icon>
                    </div>
                    <span style={{ fontSize: '15px', color: 'var(--text-main)' }}>Reduce Spending</span>
                </button>

                <button 
                  onClick={() => setInputs(prev => ({...prev, transactionConsistency: Math.min(100, prev.transactionConsistency + 25)}))}
                  className="btn btn-secondary" 
                  style={{ justifyContent: 'flex-start', padding: '16px 24px', borderRadius: '16px', gap: '16px', opacity: inputs.transactionConsistency >= 100 ? 0.5 : 1, cursor: inputs.transactionConsistency >= 100 ? 'not-allowed' : 'pointer' }}
                  disabled={inputs.transactionConsistency >= 100}
                >
                    <div style={{ background: 'rgba(245,158,11,0.1)', color: '#F59E0B', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <ion-icon name="swap-horizontal-outline" style={{fontSize: '20px'}}></ion-icon>
                    </div>
                    <span style={{ fontSize: '15px', color: 'var(--text-main)' }}>Increase Transaction Activity</span>
                </button>
            </div>
        </div>
      </div>

      {/* Reactive Everyday Spending Habits Graph */}
      <div style={{ background: 'var(--white)', padding: '30px', borderRadius: '32px', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-color)', marginBottom: '40px' }}>
        <h3 style={{ marginBottom: '8px', fontSize: '22px' }}>Aggregated Weekly Spending</h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: '40px', fontSize: '15px' }}>
            Graph peaks dynamically react to the simulated behaviors of the user.
        </p>
        
        <div style={{ display: 'flex', alignItems: 'flex-end', height: '220px', gap: '20px', paddingBottom: '10px', borderBottom: '1px solid var(--border-color)' }}>
          {dynamicSpending.map((data, index) => {
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
                    transition: 'all 0.6s cubic-bezier(0.1, 0.8, 0.2, 1)',
                    position: 'relative'
                  }}
                  title={`$${data.amount} on ${data.category}`}
                >
                  <span style={{ opacity: isSpike ? 1 : 0.7, position: 'absolute', top: '-30px', left: '50%', transform: 'translateX(-50%)', fontSize: '14px', fontWeight: 800, color: isSpike ? '#F59E0B' : 'var(--text-main)', transition: 'color 0.3s' }}>${data.amount}</span>
                </div>
                <span style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: 600 }}>{data.day}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Credit Score Growth Line Chart */}
      <div style={{ background: 'var(--white)', padding: '30px', borderRadius: '32px', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-color)', marginTop: '40px', marginBottom: '40px' }}>
        <h3 style={{ marginBottom: '8px', fontSize: '22px' }}>Credit Score Growth</h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: '40px', fontSize: '15px' }}>
            Your score improves with consistent financial behavior
        </p>
        
        <div style={{ position: 'relative', height: '220px', width: '100%', marginBottom: '24px' }}>
            {/* Minimal Grid */}
            <div style={{ position: 'absolute', top: 0, left: '40px', right: 0, bottom: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', zIndex: 1 }}>
                {[1000, 750, 500, 250, 0].map(val => (
                    <div key={val} style={{ borderTop: '1px dashed var(--border-color)', width: '100%', height: 0, position: 'relative' }}>
                        <span style={{ position: 'absolute', left: '-40px', top: '-8px', fontSize: '13px', fontWeight: 600, color: 'var(--text-muted)' }}>{val}</span>
                    </div>
                ))}
            </div>

            {/* Responsive SVG Line path */}
            <svg style={{ position: 'absolute', top: '0', left: '40px', width: 'calc(100% - 40px)', height: '100%', zIndex: 2, overflow: 'visible' }} viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="lineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="var(--primary-blue)" stopOpacity="0.15"/>
                        <stop offset="100%" stopColor="var(--primary-blue)" stopOpacity="0"/>
                    </linearGradient>
                </defs>
                <path d="M 0 38 C 16.5 38, 16.5 35, 33.3 35 C 50 35, 50 30, 66.6 30 C 83.3 30, 83.3 26, 100 26 L 100 100 L 0 100 Z" fill="url(#lineGrad)" />
                <path d="M 0 38 C 16.5 38, 16.5 35, 33.3 35 C 50 35, 50 30, 66.6 30 C 83.3 30, 83.3 26, 100 26" fill="none" stroke="var(--primary-blue)" strokeWidth="4" vectorEffect="non-scaling-stroke" strokeLinecap="round" />
            </svg>

            {/* Scale-independent HTML Focus Dots */}
            <div style={{ position: 'absolute', top: 0, left: '40px', width: 'calc(100% - 40px)', height: '100%', zIndex: 3 }}>
                <div style={{ position: 'absolute', left: '0%', top: '38%', width: '10px', height: '10px', background: 'var(--primary-blue)', borderRadius: '50%', transform: 'translate(-50%, -50%)', border: '2px solid var(--white)' }}></div>
                <div style={{ position: 'absolute', left: '33.3%', top: '35%', width: '10px', height: '10px', background: 'var(--primary-blue)', borderRadius: '50%', transform: 'translate(-50%, -50%)', border: '2px solid var(--white)' }}></div>
                <div style={{ position: 'absolute', left: '66.6%', top: '30%', width: '10px', height: '10px', background: 'var(--primary-blue)', borderRadius: '50%', transform: 'translate(-50%, -50%)', border: '2px solid var(--white)' }}></div>
                
                {/* Highlight Latest Point */}
                <div style={{ position: 'absolute', left: '100%', top: '26%', width: '16px', height: '16px', background: 'var(--white)', border: '4px solid var(--primary-blue)', borderRadius: '50%', transform: 'translate(-50%, -50%)', boxShadow: '0 0 0 6px rgba(0,82,255,0.2)' }}>
                    <div style={{ position: 'absolute', top: '-38px', left: '50%', transform: 'translateX(-50%)', background: 'var(--primary-blue)', color: 'white', padding: '6px 14px', borderRadius: '12px', fontSize: '14px', fontWeight: '800', boxShadow: 'var(--shadow-sm)' }}>740</div>
                </div>
            </div>
        </div>

        {/* X Axis Labels */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginLeft: '40px', color: 'var(--text-muted)', fontSize: '14px', fontWeight: 600 }}>
            <span>Week 1</span>
            <span>Week 2</span>
            <span>Week 3</span>
            <span style={{ color: 'var(--primary-blue)', fontWeight: 800 }}>Week 4</span>
        </div>
      </div>
    </>
  );
}
