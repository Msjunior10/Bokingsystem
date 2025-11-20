import React, { useState } from 'react';
import axios from 'axios';

export default function Booktablepage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
    guests: 1,
    duration: 1
  });
  const [submitted, setSubmitted] = useState(false);
  const [closealert, setClosealert] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: name === 'guests' || name === 'duration' ? Number(value) : value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5149/booking', form);
      // Save email to localStorage for user identification
      if (form.email) {
        localStorage.setItem('userEmail', form.email);
      }
      setSubmitted(true);
      setClosealert(false);
      console.log('Bokning skickad');
    } catch (error) {
      alert('Något gick fel vid bokningen!');
    }
  }

  function Closealert() {
    setClosealert(true);
  }

  return (
    <div className="booking-form-container">
      <h1>Book a Table</h1>
      {submitted && !closealert ? (
        <div className="booking-confirmation" style={{position: 'relative'}}>
          <button 
            onClick={Closealert}
            className="close-x"
            aria-label="Close"
          >
            X
          </button>
          <h2>Thank you for your booking, {form.name}!</h2>
          <p>We have received your reservation for {form.guests} guest(s) on {form.date} at {form.time}.</p>
        </div>
      ) : !submitted ? (
        <form className="booking-form" onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" name="name" value={form.name} onChange={handleChange} required />
          </label>
          <label>
            Email:
            <input type="email" name="email" value={form.email} onChange={handleChange} required />
          </label>
          <label>
            Date:
            <input type="date" name="date" value={form.date} onChange={handleChange} required />
          </label>
          <label>
            Time:
            <input type="time" name="time" value={form.time} onChange={handleChange} required />
          </label>
          <label>
            Number of guests:
            <input type="number" name="guests" min="1" max="20" value={form.guests} onChange={handleChange} required />
          </label>
          <label>
            Duration (hours):
            <input type="number" name="duration" min="1" max="6" value={form.duration} onChange={handleChange} required />
          </label>
          <button type="submit">Book Table</button>
        </form>
      ) : null}
    </div>
  );
}