import '../components.css';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import Themebutton from './Themebutton';

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const handleMenuLinkClick = () => setMenuOpen(false);
    return (
        <header className="Header">
            <nav className="nav-desktop">
                <ul className='Ul'>
                    <Link style={{ textDecoration: 'none', color: 'black' }} to="/">Home</Link>
                </ul>
                <ul className='Ul'>
                    <Link style={{ textDecoration: 'none', color: 'black' }} to="/booktable">Book a table</Link>
                </ul>
                <ul className='Ul'>
                    <Link style={{ textDecoration: 'none', color: 'black' }} to="/available-bookings">Available booking times</Link>
                </ul>
                <ul className='Ul'>
                    <Link style={{ textDecoration: 'none', color: 'black' }} to="/my-bookings">My bookings</Link>
                </ul>
            </nav>
            <button className={`hamburger${menuOpen ? ' open' : ''}`} onClick={() => setMenuOpen(m => !m)} aria-label="Toggle menu">
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </button>
            {menuOpen && (
                <nav className="nav-mobile">
                    <ul className='Ul'><Link to="/" onClick={handleMenuLinkClick}>Home</Link></ul>
                    <ul className='Ul'><Link to="/booktable" onClick={handleMenuLinkClick}>Book a table</Link></ul>
                    <ul className='Ul'><Link to="/available-bookings" onClick={handleMenuLinkClick}>Available booking times</Link></ul>
                    <ul className='Ul'><Link to="/my-bookings" onClick={handleMenuLinkClick}>My bookings</Link></ul>
                </nav>
            )}
            <Themebutton />
        </header>
    );
}