import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { useNotification } from '../hooks/useNotification';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function Dashboard() {
  const { showSuccess, showError, showInfo } = useNotification();
  const [roadmap, setRoadmap] = useState('');
  const [loading, setLoading] = useState(false);
  const [connections, setConnections] = useState({ youtube: false, x: false });
  const [statusLoading, setStatusLoading] = useState(true);

  // This useEffect hook now fetches the user's connection status when the component loads.
  useEffect(() => {
    const fetchConnectionStatus = async () => {
      setStatusLoading(true);
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const config = { headers: { 'x-auth-token': token } };
          const res = await axios.get(`${API_URL}/api/user/status`, config);
          setConnections(res.data);
        }
      } catch (err) {
        console.error("Could not fetch connection status:", err);
        showError("Could not load connection status. Please refresh the page.");
      } finally {
        setStatusLoading(false);
      }
    };

    fetchConnectionStatus();
  }, []); // The empty array ensures this runs only once on mount

  const handleConnect = (platform) => {
    const token = localStorage.getItem('token');
    let url = '';
    if (platform === 'youtube') {
      url = `${API_URL}/api/integrations/google?token=${token}`;
    } else if (platform === 'x') {
      url = `${API_URL}/api/integrations/x?token=${token}`;
    } else {
      showInfo(`Integration for ${platform} is coming soon!`);
      return;
    }
    showInfo(`Redirecting to ${platform} authentication...`);
    window.location.href = url;
  };

  const handleGenerateRoadmap = async () => {
    setLoading(true);
    setRoadmap('');
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { 'x-auth-token': token } };
      const res = await axios.get(`${API_URL}/api/analysis/generate-roadmap`, config);
      setRoadmap(res.data.roadmap);
      showSuccess('Your personalized roadmap has been generated!');
    } catch (err) {
      console.error(err);
      const errorMessage = err.response?.data?.msg || 'Error generating roadmap. Please ensure at least one social account is connected.';
      showError(errorMessage);
    }
    setLoading(false);
  };

  return (
    <div className="dashboard-grid">
      <div className="integrations-panel">
        <h3>Your Stack</h3>
        <p>Connect your platforms to get a holistic analysis.</p>
        {statusLoading && <div className="loader">Loading connections...</div>}
        <ul className="integration-list">
          <li className={`integration-item ${connections.youtube ? 'connected' : ''}`}>
            <span>YouTube</span>
            <button 
              onClick={() => handleConnect('youtube')} 
              disabled={connections.youtube || statusLoading}
            >
              {connections.youtube ? 'Connected' : 'Connect'}
            </button>
          </li>
          <li className={`integration-item ${connections.x ? 'connected' : ''}`}>
            <span>X</span>
            <button 
              onClick={() => handleConnect('x')} 
              disabled={connections.x || statusLoading}
            >
              {connections.x ? 'Connected' : 'Connect'}
            </button>
          </li>
          <li className="integration-item">
            <span>Substack</span>
            <button 
              onClick={() => handleConnect('substack')} 
              disabled={statusLoading}
            >
              Connect
            </button>
          </li>
        </ul>
      </div>

      <div className="main-panel">
        <header className="main-panel-header">
          <h2>AI Strategy Session</h2>
          <p>Generate a new growth roadmap based on your connected data.</p>
          <button 
            onClick={handleGenerateRoadmap} 
            disabled={loading || statusLoading} 
            className="generate-btn"
          >
            {loading ? 'Analyzing...' : 'Generate AI Roadmap'}
          </button>
        </header>

        {loading && <div className="loader">Analyzing your data...</div>}

        {roadmap && (
          <div className="roadmap-results-v2">
            <h3>🚀 Your Personalized Roadmap</h3>
            <ReactMarkdown>{roadmap}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
