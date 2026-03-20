import { BrowserRouter as Router, Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Consent from './pages/Consent';
import Dashboard from './pages/Dashboard';
import Insights from './pages/Insights';
import Sustainability from './pages/Sustainability';
import './App.css';

function Layout({ children }) {
  const navigate = useNavigate();
  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="logo">
          <ion-icon name="leaf-outline" class="logo-icon"></ion-icon>
          <h1>CredNova</h1>
        </div>
        <nav className="nav-links">
          <NavLink to="/dashboard" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
            <ion-icon name="home-outline"></ion-icon> Dashboard
          </NavLink>
          <NavLink to="/insights" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
            <ion-icon name="pie-chart-outline"></ion-icon> Insights
          </NavLink>
          <NavLink to="/sustainability" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
            <ion-icon name="leaf-outline"></ion-icon> Sustainability
          </NavLink>
        </nav>
        <div style={{marginTop: 'auto'}}>
          <button className="btn btn-secondary" onClick={() => navigate('/')}>
            <ion-icon name="log-out-outline"></ion-icon> Sign Out
          </button>
        </div>
      </aside>
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/consent" element={<Consent />} />
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/insights" element={<Layout><Insights /></Layout>} />
        <Route path="/sustainability" element={<Layout><Sustainability /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;
