import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function Dashboard() {
  const [roadmap, setRoadmap] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [connections, setConnections] = useState({ youtube: false, twitter: false });

  // In a real app, you'd fetch this status from the backend
  // useEffect(() => { ... }, []);

  const handleConnect = (platform) => {
    const token = localStorage.getItem('token');
    let url = '';
    if (platform === 'youtube') {
      url = `${API_URL}/api/integrations/google?token=${token}`;
    } else if (platform === 'twitter') {
      url = `${API_URL}/api/integrations/twitter?token=${token}`;
    } else {
      alert(`Integration for ${platform} is coming soon!`);
      return;
    }
    window.location.href = url;
  };

  const handleGenerateRoadmap = async () => {
    setLoading(true);
    setRoadmap('');
    setError('');
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { 'x-auth-token': token } };
      const res = await axios.get(`${API_URL}/api/analysis/generate-roadmap`, config);
      setRoadmap(res.data.roadmap);
    } catch (err) {
      console.error(err);
      setError('Error generating roadmap. Please ensure at least one social account is connected.');
    }
    setLoading(false);
  };

  return (
    <div className="dashboard-grid">
      <div className="integrations-panel">
        <h3>Your Stack</h3>
        <p>Connect your platforms to get a holistic analysis.</p>
        <ul className="integration-list">
          <li className={`integration-item ${connections.youtube ? 'connected' : ''}`}>
            <span>YouTube</span>
            <button onClick={() => handleConnect('youtube')} disabled={connections.youtube}>
              {connections.youtube ? 'Connected' : 'Connect'}
            </button>
          </li>
          <li className={`integration-item ${connections.twitter ? 'connected' : ''}`}>
            <span>X / Twitter</span>
            <button onClick={() => handleConnect('twitter')} disabled={connections.twitter}>
              {connections.twitter ? 'Connected' : 'Connect'}
            </button>
          </li>
          <li className="integration-item">
            <span>Substack</span>
            <button onClick={() => handleConnect('substack')}>Connect</button>
          </li>
        </ul>
      </div>

      <div className="main-panel">
        <header className="main-panel-header">
          <h2>AI Strategy Session</h2>
          <p>Generate a new growth roadmap based on your connected data.</p>
          <button onClick={handleGenerateRoadmap} disabled={loading} className="generate-btn">
            {loading ? 'Analyzing...' : 'Generate AI Roadmap'}
          </button>
        </header>

        {error && <div className="error-message">{error}</div>}
        
        {loading && <div className="loader">Analyzing your data...</div>}

        {roadmap && (
          <div className="roadmap-results-v2">
            <h3>Your Personalized Roadmap</h3>
            <ReactMarkdown>{roadmap}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
