import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div className="landing-page">
      <header className="landing-header">
        <h1>CreatorOS Navigator</h1>
        <p>Your AI-Powered Business Strategist for Content Creation</p>
        <Link to="/auth/login" className="cta-button">Get Started</Link>
      </header>

      <section className="features">
        <h2>Your Entire Business, Understood in Minutes</h2>
        <div className="feature-cards">
          <div className="card">
            <h3>Connect Your Stack</h3>
            <p>Securely link YouTube, X/Twitter, Substack, and more. Our AI ingests your content and analytics to see the full picture.</p>
          </div>
          <div className="card">
            <h3>AI-Powered Analysis</h3>
            <p>Navigator analyzes your niche, voice, and engagement patterns to identify high-potential growth opportunities.</p>
          </div>
          <div className="card">
            <h3>Receive Your Roadmap</h3>
            <p>Get a dynamic, step-by-step strategic plan with content suggestions and monetization ideas tailored to you.</p>
          </div>
        </div>
      </section>

      <footer className="landing-footer">
        <p>&copy; 2025 CreatorOS. All Rights Reserved.</p>
        <Link to="/privacy">Privacy Policy</Link>
      </footer>
    </div>
  );
}

export default LandingPage;
