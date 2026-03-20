import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Consent from './pages/Consent';
import Dashboard from './pages/Dashboard';
import Insights from './pages/Insights';
import Sustainability from './pages/Sustainability';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/consent" element={<Consent />} />
        <Route path="/*" element={
          <div className="app-container">
            <aside className="sidebar">
              <div className="logo">
                <ion-icon name="shield-checkmark" class="logo-icon"></ion-icon>
                <h1>GigTrust</h1>
              </div>
              <nav className="nav-links">
                <NavLink to="/dashboard" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
                  <ion-icon name="grid-outline"></ion-icon> Dashboard
                </NavLink>
                <NavLink to="/insights" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
                  <ion-icon name="bulb-outline"></ion-icon> Insights
                </NavLink>
                <NavLink to="/sustainability" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
                  <ion-icon name="leaf-outline"></ion-icon> Sustainability
                </NavLink>
              </nav>
              <div className="user-profile" style={{ flexDirection: 'column', alignItems: 'stretch', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <ion-icon name="person-circle-outline"></ion-icon>
                  <span>Alex Parker</span>
                </div>
                <NavLink to="/login" className="btn btn-secondary" style={{ textDecoration: 'none', display: 'flex', justifyContent: 'center', fontSize: '14px', padding: '10px' }}>
                  <ion-icon name="log-out-outline"></ion-icon> Sign Out
                </NavLink>
              </div>
            </aside>
            <main className="main-content">
              <Routes>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="insights" element={<Insights />} />
                <Route path="sustainability" element={<Sustainability />} />
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </main>
          </div>
        } />
      </Routes>
    </Router>
  );
}
