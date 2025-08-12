import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      // Instead of calling setToken, we'll navigate and let the App component re-render
      navigate('/');
      window.location.reload(); // Force a reload to ensure App component checks token
    } catch (err) {
      console.error(err.response ? err.response.data : err);
      alert('Invalid credentials');
    }
  };

  return (
    <div className="auth-container">
      <h1>Welcome Back</h1>
      <form className="auth-form" onSubmit={onSubmit}>
        <h2>Login</h2>
        <input type="email" placeholder="Email Address" name="email" value={formData.email} onChange={onChange} required />
        <input type="password" placeholder="Password" name="password" value={formData.password} onChange={onChange} required />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <Link to="/auth/register">Register here</Link></p>
    </div>
  );
}

export default Login;
