import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import LandingPage from './components/LandingPage';
import PrivacyPolicy from './components/PrivacyPolicy';
import NotificationContainer from './components/NotificationContainer';
import { useNotification } from './hooks/useNotification';
import './App.css';

// New layout for the main authenticated app
const AppLayout = ({ notifications, removeNotification }) => (
  <div className="app-layout">
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/app/dashboard">CreatorOS</Link>
      </div>
      <div className="navbar-menu">
        <Link to="/app/dashboard" className="nav-link">Dashboard</Link>
        <Link to="/app/integrations" className="nav-link">Integrations</Link>
        <button onClick={() => {
          localStorage.removeItem('token');
          window.location.href = '/';
        }} className="logout-nav-btn">
          Logout
        </button>
      </div>
    </nav>
    <main className="main-content">
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Add a placeholder for the integrations page */}
        <Route path="/integrations" element={<Dashboard />} /> 
        <Route path="*" element={<Navigate to="/app/dashboard" />} />
      </Routes>
    </main>
    <NotificationContainer 
      notifications={notifications} 
      removeNotification={removeNotification} 
    />
  </div>
);

// New layout for authentication pages
const AuthLayout = ({ notifications, removeNotification }) => (
    <div className="auth-page-v2">
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/auth/login" />} />
        </Routes>
        <NotificationContainer 
          notifications={notifications} 
          removeNotification={removeNotification} 
        />
    </div>
);

function App() {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const { notifications, removeNotification } = useNotification();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={
            <>
              <LandingPage />
              <NotificationContainer 
                notifications={notifications} 
                removeNotification={removeNotification} 
              />
            </>
          } />
          <Route path="/privacy" element={
            <>
              <PrivacyPolicy />
              <NotificationContainer 
                notifications={notifications} 
                removeNotification={removeNotification} 
              />
            </>
          } />
          
          {/* Authenticated app routes under /app/* */}
          <Route path="/app/*" element={token ? 
            <AppLayout notifications={notifications} removeNotification={removeNotification} /> : 
            <Navigate to="/auth/login" />
          } />
          
          {/* Auth routes under /auth/* */}
          <Route path="/auth/*" element={!token ? 
            <AuthLayout notifications={notifications} removeNotification={removeNotification} /> : 
            <Navigate to="/app/dashboard" />
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
