import React, { useState } from 'react';
import axios from 'axios';

export default function LoginPage(props) {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://localhost:5149/auth/login', form);
      const { token, name, username } = res.data;
      sessionStorage.setItem('jwt', token);
      sessionStorage.setItem('username', username);
      sessionStorage.setItem('name', name);
      if (props.onLogin) props.onLogin({ token, name, username });
    } catch (err) {
      setError(err.response?.data || 'Login failed');
    }
  }

  return (
    <div className="booking-form-container">
      <h1>Login</h1>
      <form className="booking-form" onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" name="username" value={form.username} onChange={handleChange} required />
        </label>
        <label>
          Password:
          <input type="password" name="password" value={form.password} onChange={handleChange} required />
        </label>
        <button type="submit">Login</button>
        {error && <div style={{ color: '#db5275', fontWeight: 'bold', marginTop: '8px', textAlign: 'center' }}>{error}</div>}
      </form>
      <div style={{ marginTop: '18px', textAlign: 'center' }}>
        <span>Don't have an account? </span>
        <a href="/signup" style={{ color: '#db5275', fontWeight: 'bold', textDecoration: 'underline', cursor: 'pointer' }}>
          Sign up here
        </a>
      </div>
    </div>
  );
}
