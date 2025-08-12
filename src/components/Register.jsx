import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/auth/register', formData);
      alert('Registration successful! Please log in.');
      navigate('/auth/login'); // Navigate to the login page
    } catch (err) {
      console.error(err.response ? err.response.data : err);
      alert('Error: ' + (err.response?.data?.msg || 'Could not register'));
    }
  };

  return (
    <div className="auth-container">
      <h1>Join CreatorOS</h1>
      <form className="auth-form" onSubmit={onSubmit}>
        <h2>Register</h2>
        <input type="email" placeholder="Email Address" name="email" value={formData.email} onChange={onChange} required />
        <input type="password" placeholder="Password" name="password" value={formData.password} onChange={onChange} required minLength="6" />
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <Link to="/auth/login">Login here</Link></p>
    </div>
  );
}

export default Register;
