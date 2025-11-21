import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import './components.css';
import { Routes, Route } from 'react-router-dom';

import Booktablepage from './components/Booktablepage';
import AvailableBookingsPage from './components/AvailableBookingsPage';
import MyBookingsPage from './components/MyBookingsPage';
import Gifdiv from './components/Gifdiv';
import Footer from './components/footer';
import SignUpPage from './components/SignUpPage';
import LoginPage from './components/LoginPage';
import AdminBookingsPage from './components/AdminBookingsPage';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [jwt, setJwt] = useState(() => sessionStorage.getItem('jwt'));
  const [isAuthenticated, setIsAuthenticated] = useState(!!jwt);

  useEffect(() => {
    function checkAuth() {
      const token = sessionStorage.getItem('jwt');
      setJwt(token);
      setIsAuthenticated(!!token);
    }
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  function handleLogin() {
    const token = sessionStorage.getItem('jwt');
    setJwt(token);
    setIsAuthenticated(!!token);
  }

  useEffect(() => {
    setIsAuthenticated(!!jwt);
  }, [jwt]);


  // Kontrollera om användaren är admin (JWT payload)
  let isAdmin = false;
  if (jwt) {
    try {
      const payload = JSON.parse(atob(jwt.split('.')[1]));
      isAdmin = payload["role"] === 'admin';
    } catch {}
  }

  if (!isAuthenticated) {
    return (
      <div className="App">
        <Routes>
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="*" element={<LoginPage onLogin={handleLogin} />} />
        </Routes>
      </div>
    );
  }

  return (
    <div className="App">
      <Header isAdmin={isAdmin} />
      <Routes>
        <Route path="/" element={<Gifdiv />} />
        <Route path="/booktable" element={<Booktablepage />} />
        <Route path="/available-bookings" element={<AvailableBookingsPage />} />
        <Route path="/my-bookings" element={<MyBookingsPage />} />
        {isAdmin && <Route path="/admin-bookings" element={<AdminBookingsPage />} />}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
