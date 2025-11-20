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
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    setIsAuthenticated(!!sessionStorage.getItem('jwt'));
  }, []);

  function handleLogin() {
    setIsAuthenticated(true);
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
      <Header />
      <Routes>
        <Route path="/" element={<Gifdiv />} />
        <Route path="/booktable" element={<Booktablepage />} />
        <Route path="/available-bookings" element={<AvailableBookingsPage />} />
        <Route path="/my-bookings" element={<MyBookingsPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
