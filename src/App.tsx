import React from 'react';
import './App.css';
import Header from './components/Header';
import './components.css';
import { Routes, Route } from 'react-router-dom';
import Booktablepage from './components/Booktablepage';
import AvailableBookingsPage from './components/AvailableBookingsPage';
import MyBookingsPage from './components/MyBookingsPage';
import Gifdiv from './components/Gifdiv';
import Footer from './components/footer';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
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
