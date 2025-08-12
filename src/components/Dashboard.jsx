import React, { useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function Dashboard() {
  const [roadmap, setRoadmap] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleConnectGoogle = () => {
    const token = localStorage.getItem('token');
    window.location.href = `${API_URL}/api/integrations/google?token=${token}`;
  };

  const handleGenerateRoadmap = async () => {
    setLoading(true);
    setRoadmap('');
    setError('');
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { 'x-auth-token': token }
      };
      const res = await axios.get(`${API_URL}/api/analysis/generate-roadmap`, config);
      setRoadmap(res.data.roadmap);
    } catch (err) {
      console.error(err);
      setError('Error generating roadmap. Please ensure your Google account is connected and has a YouTube channel.');
    }
    setLoading(false);
  };

  return (
    <div className="dashboard-content">
      <header className="dashboard-header">
        <h2>Dashboard</h2>
        <p>Welcome! This is your control center.</p>
      </header>

      <div className="dashboard-actions">
        <div className="action-card">
            <h3>Step 1: Connect</h3>
            <p>Allow CreatorOS to securely access your YouTube data.</p>
            <button onClick={handleConnectGoogle}>Connect Google Account</button>
        </div>
        <div className="action-card">
            <h3>Step 2: Analyze</h3>
            <p>Generate your personalized growth roadmap using AI.</p>
            <button onClick={handleGenerateRoadmap} disabled={loading}>
                {loading ? 'Generating...' : 'Generate AI Roadmap'}
            </button>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

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
