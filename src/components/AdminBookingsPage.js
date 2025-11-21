
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(null); // booking being edited
  const [form, setForm] = useState({ date: '', time: '', guests: 1, duration: 1, name: '', email: '' });

  function fetchBookings() {
    const jwt = sessionStorage.getItem('jwt');
    axios.get('http://localhost:5149/booking/admin/bookings', {
      headers: { Authorization: `Bearer ${jwt}` }
    })
      .then(res => setBookings(res.data))
      .catch(() => setError('Could not fetch bookings'));
  }

  useEffect(() => {
    fetchBookings();
  }, []);

  function handleDelete(id) {
    const jwt = sessionStorage.getItem('jwt');
    axios.delete(`http://localhost:5149/booking/${id}`, {
      headers: { Authorization: `Bearer ${jwt}` }
    })
      .then(() => fetchBookings())
      .catch(() => setError('Could not delete booking'));
  }

  function handleEdit(booking) {
    setEditing(booking.id);
    setForm({
      date: booking.date,
      time: booking.time,
      guests: booking.guests,
      duration: booking.duration,
      name: booking.name,
      email: booking.email
    });
  }

  function handleFormChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  }

  function handleUpdate(e) {
    e.preventDefault();
    const jwt = sessionStorage.getItem('jwt');
    axios.put(`http://localhost:5149/booking/${editing}`, form, {
      headers: { Authorization: `Bearer ${jwt}` }
    })
      .then(() => {
        setEditing(null);
        fetchBookings();
      })
      .catch(() => setError('Could not update booking'));
  }

  function handleCancel() {
    setEditing(null);
  }

  return (
    <div className="my-bookings-container">
      <h1>All Bookings (Admin)</h1>
      {error && <div style={{ color: '#db5275', fontWeight: 'bold' }}>{error}</div>}
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <ul className="my-bookings-list">
          {bookings.map(b => (
            <li key={b.id} className="my-booking-item">
              {editing === b.id ? (
                <form onSubmit={handleUpdate} className="booking-form" style={{ display: 'inline-block', marginRight: 8 }}>
                  <input name="date" value={form.date} onChange={handleFormChange} required style={{ width: 90 }} />
                  <input name="time" value={form.time} onChange={handleFormChange} required style={{ width: 60 }} />
                  <input name="guests" type="number" min="1" value={form.guests} onChange={handleFormChange} required style={{ width: 50 }} />
                  <input name="duration" type="number" min="1" value={form.duration} onChange={handleFormChange} required style={{ width: 50 }} />
                  <input name="name" value={form.name} onChange={handleFormChange} required style={{ width: 100 }} />
                  <input name="email" value={form.email} onChange={handleFormChange} required style={{ width: 140 }} />
                  <button type="submit">Save</button>
                  <button type="button" onClick={handleCancel}>Cancel</button>
                </form>
              ) : (
                <>
                  <span>{b.date} at {b.time} for {b.guests} guest(s), {b.duration || 1} hour(s) - {b.name} ({b.email})</span>
                  <button onClick={() => handleEdit(b)} style={{ marginLeft: 8 }}>Edit</button>
                  <button onClick={() => handleDelete(b.id)} style={{ marginLeft: 4, color: '#db5275' }}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
