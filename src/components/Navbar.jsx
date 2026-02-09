import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);
    const location = useLocation();

    // Close mobile menu on route change
    useEffect(() => {
        setIsOpen(false);
        setOpenDropdown(null);
    }, [location]);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const toggleDropdown = (name) => {
        setOpenDropdown(openDropdown === name ? null : name);
    };

    return (
        <nav className="navbar">
            <div className="container navbar-container">
                <NavLink to="/" className="navbar-logo">
                    <img src="/grda-logo.png" alt="GRDA Logo" className="logo-image" />
                    <span>GRDA</span>
                </NavLink>

                {/* Desktop Navigation */}
                <div className="navbar-links">
                    <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Home</NavLink>

                    <div className="dropdown-container">
                        <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>About Us</NavLink>
                        <div className="dropdown-menu">
                            <NavLink to="/about" className="dropdown-item">Overview</NavLink>
                            <NavLink to="/about/board" className="dropdown-item">Board Members</NavLink>
                        </div>
                    </div>

                    <NavLink to="/directorates" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Directorates</NavLink>

                    <div className="dropdown-container">
                        <NavLink to="/units" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Units</NavLink>
                        <div className="dropdown-menu">
                            <NavLink to="/units#hse" className="dropdown-item">HSE Unit</NavLink>
                            <NavLink to="/units#it" className="dropdown-item">IT Unit</NavLink>
                            <NavLink to="/units#procurement" className="dropdown-item">Procurement</NavLink>
                            <NavLink to="/units#records" className="dropdown-item">Records Unit</NavLink>
                            <NavLink to="/units#audit" className="dropdown-item">Audit Unit</NavLink>
                        </div>
                    </div>

                    <NavLink to="/projects" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Projects</NavLink>
                    <NavLink to="/services" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Services</NavLink>
                    <NavLink to="/media" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Blog & Media</NavLink>
                    <NavLink to="/contact" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Contact</NavLink>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="mobile-menu-toggle"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label={isOpen ? 'Close menu' : 'Open menu'}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Navigation Overlay */}
            <div className={`mobile-nav-overlay ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(false)}></div>

            {/* Mobile Navigation Menu */}
            <div className={`mobile-nav ${isOpen ? 'active' : ''}`}>
                <div className="mobile-nav-content">
                    <NavLink to="/" className="mobile-nav-link">Home</NavLink>

                    <div className="mobile-dropdown">
                        <button className="mobile-dropdown-toggle" onClick={() => toggleDropdown('about')}>
                            About Us
                            <ChevronDown size={18} className={openDropdown === 'about' ? 'rotate' : ''} />
                        </button>
                        <div className={`mobile-dropdown-menu ${openDropdown === 'about' ? 'open' : ''}`}>
                            <NavLink to="/about" className="mobile-dropdown-item">Overview</NavLink>
                            <NavLink to="/about/board" className="mobile-dropdown-item">Board Members</NavLink>
                        </div>
                    </div>

                    <NavLink to="/directorates" className="mobile-nav-link">Directorates</NavLink>

                    <div className="mobile-dropdown">
                        <button className="mobile-dropdown-toggle" onClick={() => toggleDropdown('units')}>
                            Units
                            <ChevronDown size={18} className={openDropdown === 'units' ? 'rotate' : ''} />
                        </button>
                        <div className={`mobile-dropdown-menu ${openDropdown === 'units' ? 'open' : ''}`}>
                            <NavLink to="/units#hse" className="mobile-dropdown-item">HSE Unit</NavLink>
                            <NavLink to="/units#it" className="mobile-dropdown-item">IT Unit</NavLink>
                            <NavLink to="/units#procurement" className="mobile-dropdown-item">Procurement</NavLink>
                            <NavLink to="/units#records" className="mobile-dropdown-item">Records Unit</NavLink>
                            <NavLink to="/units#audit" className="mobile-dropdown-item">Audit Unit</NavLink>
                        </div>
                    </div>

                    <NavLink to="/projects" className="mobile-nav-link">Projects</NavLink>
                    <NavLink to="/services" className="mobile-nav-link">Services</NavLink>
                    <NavLink to="/media" className="mobile-nav-link">Blog & Media</NavLink>
                    <NavLink to="/contact" className="mobile-nav-link">Contact</NavLink>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
