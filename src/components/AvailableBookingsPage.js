
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AvailableBookingsPage() {
  const [availableTimes, setAvailableTimes] = useState([]);
  const [date, setDate] = useState('');

  useEffect(() => {
    if (!date) return;
    const jwt = sessionStorage.getItem('jwt');
    axios.get(`http://localhost:5149/available-times?date=${date}`,
      jwt ? { headers: { Authorization: `Bearer ${jwt}` } } : undefined)
      .then(res => setAvailableTimes(res.data))
      .catch(() => setAvailableTimes([]));
  }, [date]);

  return (
    <div className="available-bookings-container">
      <h1>Available Booking Times</h1>
      <label style={{ marginBottom: '25px' }} className='date-label'>
        Choose date:
        <input type="date" value={date} onChange={e => setDate(e.target.value)} />
      </label>
      {date && availableTimes.length === 0 ? (
        <p>No available times for this date.</p>
      ) : (
        <ul className="available-bookings-list">
          {availableTimes.map((t, i) => (
            <li key={i} className="available-booking-item">
              {t.date} at {t.time}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
