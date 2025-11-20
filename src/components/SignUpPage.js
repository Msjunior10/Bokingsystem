import React, { useState } from 'react';
import axios from 'axios';

export default function SignUpPage(props) {
  const [form, setForm] = useState({ name: '', username: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      await axios.post('http://localhost:5149/auth/register', form);
      setSuccess(true);
      if (props.onSuccess) props.onSuccess();
    } catch (err) {
      setError(err.response?.data || 'Registration failed');
    }
  }

  return (
    <div className="booking-form-container">
      <h1>Sign Up</h1>
      {success ? (
        <p style={{ color: '#00c853', fontWeight: 'bold', textAlign: 'center' }}>Registration successful! You can now log in.</p>
      ) : (
        <form className="booking-form" onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" name="name" value={form.name} onChange={handleChange} required />
          </label>
          <label>
            Username:
            <input type="text" name="username" value={form.username} onChange={handleChange} required />
          </label>
          <label>
            Password:
            <input type="password" name="password" value={form.password} onChange={handleChange} required />
          </label>
          <button type="submit">Register</button>
          {error && <div style={{ color: '#db5275', fontWeight: 'bold', marginTop: '8px', textAlign: 'center' }}>{error}</div>}
        </form>
      )}
    </div>
  );
}
