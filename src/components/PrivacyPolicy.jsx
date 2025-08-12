import React from 'react';
import { Link } from 'react-router-dom';

function PrivacyPolicy() {
  return (
    <div className="policy-page">
      <h1>Privacy Policy for CreatorOS Navigator</h1>
      <p><em>Last Updated: August 11, 2025</em></p>

      <p>CreatorOS Navigator ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our application.</p>

      <h2>1. Information We Collect</h2>
      <p>We collect information you provide directly to us, such as your email address when you register for an account. When you connect third-party platforms like Google (for YouTube), we access data via their APIs as authorized by you. This includes:</p>
      <ul>
        <li><strong>YouTube Data:</strong> We access your channel's public information and analytics data (view counts, subscriber counts, video performance) to generate your strategic roadmap. We only request read-only access.</li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <p>We use the data obtained solely to provide and improve the user-facing features of our service. Specifically, your YouTube data is sent to a large language model (like Google's Gemini API) to generate your personalized growth roadmap. **Your data is not used to train AI models.**</p>

      <h2>3. How We Store Your Information</h2>
      <p>We store your account information and the secure authentication tokens for connected platforms in our database. We use industry-standard security measures to protect your information.</p>
      
      <h2>4. Sharing Your Information</h2>
      <p>We do not sell or share your personal data with third parties for marketing purposes. Data is only shared with our AI service provider (Google) for the explicit purpose of generating your roadmap analysis.</p>

      <h2>5. Limited Use Disclosure</h2>
      <p>CreatorOS Navigator's use and transfer of information received from Google APIs will adhere to the <a href="https://developers.google.com/terms/api-services-user-data-policy#limited_use_requirements" target="_blank" rel="noopener noreferrer">Google API Services User Data Policy</a>, including the Limited Use requirements.</p>

      <p><Link to="/">Return to Homepage</Link></p>
    </div>
  );
}

export default PrivacyPolicy;
