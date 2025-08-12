import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import './App.css';

// A new component for the main application layout after logging in
const AppLayout = ({ token, setToken }) => (
  <div className="app-layout">
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">CreatorOS Navigator</Link>
      </div>
      <div className="navbar-menu">
        {/* You can add more links here later, like 'Settings' or 'Profile' */}
        <button onClick={() => {
          setToken(null);
          localStorage.removeItem('token');
        }} className="logout-nav-btn">
          Logout
        </button>
      </div>
    </nav>
    <main className="main-content">
      <Dashboard setToken={setToken} token={token} />
    </main>
  </div>
);

// A new component for the authentication pages (Login/Register)
const AuthLayout = () => (
  <div className="auth-page">
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* Redirect any other auth path to login */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  </div>
);


function App() {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // This useEffect hook now also handles setting the token for axios requests
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
          {/* If there is a token, render the main AppLayout. */}
          {/* All routes inside AppLayout will be protected. */}
          <Route path="/*" element={token ? <AppLayout token={token} setToken={setToken} /> : <Navigate to="/auth/login" />} />

          {/* If there is no token, render the AuthLayout. */}
          <Route path="/auth/*" element={!token ? <AuthLayout /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
