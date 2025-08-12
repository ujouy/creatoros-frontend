import React, { useState } from 'react';
import axios from 'axios';

function Dashboard({ setToken }) {
  const [roadmap, setRoadmap] = useState(''); // State to hold the roadmap text
  const [loading, setLoading] = useState(false); // State for loading indicator

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  const handleConnectGoogle = () => {
    const token = localStorage.getItem('token');
    window.location.href = `http://localhost:3000/api/integrations/google?token=${token}`;
  };

  const handleGenerateRoadmap = async () => {
    setLoading(true);
    setRoadmap(''); // Clear previous roadmap
    try {
        const token = localStorage.getItem('token');
        const config = {
            headers: { 'x-auth-token': token }
        };
        const res = await axios.get('http://localhost:3000/api/analysis/generate-roadmap', config);
        setRoadmap(res.data.roadmap); // Set the roadmap in state instead of alerting
    } catch (err) {
        console.error(err);
        alert('Error generating roadmap. Is your Google account connected?');
    }
    setLoading(false);
  };

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <p>Welcome! You are logged in.</p>
      <div className="dashboard-actions">
        <button onClick={handleConnectGoogle}>1. Connect Google Account</button>
        <button onClick={handleGenerateRoadmap} disabled={loading}>
            {loading ? 'Generating...' : '2. Generate AI Roadmap'}
        </button>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>

      {/* Conditionally render the roadmap results */}
      {roadmap && (
        <div className="roadmap-results">
            <h3>Your Personalized Roadmap</h3>
            <pre>{roadmap}</pre>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
