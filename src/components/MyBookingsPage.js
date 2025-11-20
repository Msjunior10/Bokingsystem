import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', email: '', date: '', time: '', guests: 1, duration: 1 });

  useEffect(() => {
    axios.get('http://localhost:5149/booking')
      .then(res => setBookings(res.data))
      .catch(() => setBookings([]));
  }, []);

  async function handleCancel(id) {
    const confirmDelete = window.confirm('Are you sure you want to delete this booking?');
    if (!confirmDelete) return;
    try {
      await axios.delete(`http://localhost:5149/booking/${id}`);
      setBookings(bookings.filter(b => b.id !== id));
    } catch (error) {
      alert('Kunde inte ta bort bokningen!');
    }
  }

  function handleEdit(id) {
    const booking = bookings.find(b => b.id === id);
    setEditForm({
      name: booking.name,
      email: booking.email,
      date: booking.date,
      time: booking.time,
      guests: booking.guests,
      duration: booking.duration || 1
    });
    setEditingId(id);
  }

  function handleEditChange(e) {
    const { name, value } = e.target;
    setEditForm(f => ({ ...f, [name]: name === 'guests' || name === 'duration' ? Number(value) : value }));
  }

  async function handleEditSubmit(e) {
    e.preventDefault();
    console.log('editingId:', editingId, 'editForm:', editForm);
    try {
      await axios.put(`http://localhost:5149/booking/${editingId}`, editForm);
      setBookings(bookings.map(b => b.id === editingId ? { ...b, ...editForm } : b));
      setEditingId(null);
    } catch (error) {
      alert('Kunde inte uppdatera bokningen!');
    }
  }

  return (
    <div className="my-bookings-container">
      <h1>My Bookings</h1>
      {bookings.length === 0 ? (
        <p>You have no bookings.</p>
      ) : (
        <ul className="my-bookings-list">
          {bookings.map(b => (
            <li key={b.id} className="my-booking-item">
              {editingId === b.id ? (
                <form className="edit-booking-form" onSubmit={handleEditSubmit}>
                  <input type="date" name="date" value={editForm.date} onChange={handleEditChange} required />
                  <input type="time" name="time" value={editForm.time} onChange={handleEditChange} required />
                  <input type="number" name="guests" min="1" max="20" value={editForm.guests} onChange={handleEditChange} required />
                  <input type="number" name="duration" min="1" max="6" value={editForm.duration} onChange={handleEditChange} required />
                  <input type="text" name="name" value={editForm.name} onChange={handleEditChange} required />
                  <input type="email" name="email" value={editForm.email} onChange={handleEditChange} required />
                  <button type="submit">Save</button>
                  <button type="button" onClick={() => setEditingId(null)}>Cancel</button>
                </form>
              ) : (
                <>
                  <span>{b.date} at {b.time} for {b.guests} guest(s), {b.duration || 1} hour(s)</span>
                  <button onClick={() => handleEdit(b.id)}>Reschedule</button>
                  <button onClick={() => handleCancel(b.id)}>Cancel</button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
