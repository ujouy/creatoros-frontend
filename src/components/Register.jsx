import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useNotification } from '../hooks/useNotification';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function Register() {
  const navigate = useNavigate();
  const { showSuccess, showError } = useNotification();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post(`${API_URL}/api/auth/register`, formData);
      showSuccess('Registration successful! Please log in.');
      navigate('/auth/login');
    } catch (err) {
      console.error(err.response ? err.response.data : err);
      const errorMessage = err.response?.data?.msg || 'Registration failed. Please try again.';
      showError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h1>Join CreatorOS</h1>
      <form className="auth-form" onSubmit={onSubmit}>
        <h2>Register</h2>
        <input 
          type="email" 
          placeholder="Email Address" 
          name="email" 
          value={formData.email} 
          onChange={onChange} 
          required 
          disabled={isLoading}
        />
        <input 
          type="password" 
          placeholder="Password (min. 6 characters)" 
          name="password" 
          value={formData.password} 
          onChange={onChange} 
          required 
          minLength="6" 
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Creating Account...' : 'Register'}
        </button>
      </form>
      <p>Already have an account? <Link to="/auth/login">Login here</Link></p>
    </div>
  );
}

export default Register;
