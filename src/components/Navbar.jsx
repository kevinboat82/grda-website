import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Search } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [scrolled, setScrolled] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const searchInputRef = useRef(null);
    const location = useLocation();

    // Close mobile menu on route change
    useEffect(() => {
        setIsOpen(false);
        setOpenDropdown(null);
        setSearchOpen(false);
    }, [location]);

    // Handle scroll for navbar background enhancement
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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

    // Focus search input when opened
    useEffect(() => {
        if (searchOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [searchOpen]);

    const toggleDropdown = (name) => {
        setOpenDropdown(openDropdown === name ? null : name);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            // Navigate to search or handle search
            console.log('Search:', searchQuery);
            setSearchOpen(false);
            setSearchQuery('');
        }
    };

    return (
        <header className={`navbar-header ${scrolled ? 'scrolled' : ''}`}>
            <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
                <div className="navbar-container">
                    {/* Logo */}
                    <NavLink to="/" className="navbar-logo">
                        <img src="/grda-logo (11).png" alt="GRDA Logo" className="logo-image" />
                        <div className="navbar-logo-text">
                            <span className="logo-line-1">GHANA RAILWAY</span>
                            <span className="logo-line-2">DEVELOPMENT AUTHORITY</span>
                        </div>
                    </NavLink>

                    {/* Desktop Navigation */}
                    <div className="navbar-links">
                        <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} end>
                            Home
                        </NavLink>

                        <div className="dropdown-container">
                            <NavLink to="/about" className={({ isActive }) => `nav-link has-dropdown ${isActive ? 'active' : ''}`}>
                                About Us <span className="dropdown-indicator">+</span>
                            </NavLink>
                            <div className="dropdown-menu">
                                <div className="dropdown-menu-inner">
                                    <NavLink to="/about" className="dropdown-item">
                                        <span>Overview</span>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                                    </NavLink>
                                    <NavLink to="/about/board" className="dropdown-item">
                                        <span>Board Members</span>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                                    </NavLink>
                                </div>
                            </div>
                        </div>

                        <NavLink to="/directorates" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                            Directorates
                        </NavLink>

                        <div className="dropdown-container">
                            <NavLink to="/units" className={({ isActive }) => `nav-link has-dropdown ${isActive ? 'active' : ''}`}>
                                Units <span className="dropdown-indicator">+</span>
                            </NavLink>
                            <div className="dropdown-menu">
                                <div className="dropdown-menu-inner">
                                    <NavLink to="/units#hse" className="dropdown-item">
                                        <span>HSE Unit</span>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                                    </NavLink>
                                    <NavLink to="/units#it" className="dropdown-item">
                                        <span>IT Unit</span>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                                    </NavLink>
                                    <NavLink to="/units#procurement" className="dropdown-item">
                                        <span>Procurement</span>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                                    </NavLink>
                                    <NavLink to="/units#records" className="dropdown-item">
                                        <span>Records Unit</span>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                                    </NavLink>
                                    <NavLink to="/units#audit" className="dropdown-item">
                                        <span>Audit Unit</span>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                                    </NavLink>
                                </div>
                            </div>
                        </div>

                        <NavLink to="/projects" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                            Projects
                        </NavLink>
                        <NavLink to="/services" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                            Services
                        </NavLink>
                        <NavLink to="/media" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                            Blog & Media
                        </NavLink>
                        <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                            Contact
                        </NavLink>
                    </div>

                    {/* Right side actions */}
                    <div className="navbar-actions">
                        {/* Search Button */}
                        <button
                            className="search-toggle"
                            onClick={() => setSearchOpen(!searchOpen)}
                            aria-label="Toggle search"
                        >
                            <Search size={18} />
                        </button>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="mobile-menu-toggle"
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label={isOpen ? 'Close menu' : 'Open menu'}
                        >
                            {isOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Search Overlay */}
            <div className={`search-overlay ${searchOpen ? 'active' : ''}`}>
                <form className="search-form" onSubmit={handleSearchSubmit}>
                    <input
                        ref={searchInputRef}
                        type="search"
                        placeholder="Search GRDA..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                    />
                    <button type="submit" className="search-submit" aria-label="Submit search">
                        <Search size={20} />
                    </button>
                    <button
                        type="button"
                        className="search-close"
                        onClick={() => setSearchOpen(false)}
                        aria-label="Close search"
                    >
                        <X size={20} />
                    </button>
                </form>
            </div>

            {/* Mobile Navigation Overlay */}
            <div className={`mobile-nav-overlay ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(false)}></div>

            {/* Mobile Navigation Menu */}
            <div className={`mobile-nav ${isOpen ? 'active' : ''}`}>
                <div className="mobile-nav-header">
                    <NavLink to="/" className="mobile-nav-logo" onClick={() => setIsOpen(false)}>
                        <img src="/grda-logo (11).png" alt="GRDA Logo" className="mobile-logo-image" />
                        <span className="mobile-logo-text">GRDA</span>
                    </NavLink>
                    <button className="mobile-nav-close" onClick={() => setIsOpen(false)} aria-label="Close menu">
                        <X size={22} />
                    </button>
                </div>

                <div className="mobile-nav-content">
                    <NavLink to="/" className="mobile-nav-link" onClick={() => setIsOpen(false)}>Home</NavLink>

                    <div className="mobile-dropdown">
                        <button className="mobile-dropdown-toggle" onClick={() => toggleDropdown('about')}>
                            <span>About Us</span>
                            <span className={`mobile-toggle-icon ${openDropdown === 'about' ? 'open' : ''}`}>+</span>
                        </button>
                        <div className={`mobile-dropdown-menu ${openDropdown === 'about' ? 'open' : ''}`}>
                            <NavLink to="/about" className="mobile-dropdown-item" onClick={() => setIsOpen(false)}>Overview</NavLink>
                            <NavLink to="/about/board" className="mobile-dropdown-item" onClick={() => setIsOpen(false)}>Board Members</NavLink>
                        </div>
                    </div>

                    <NavLink to="/directorates" className="mobile-nav-link" onClick={() => setIsOpen(false)}>Directorates</NavLink>

                    <div className="mobile-dropdown">
                        <button className="mobile-dropdown-toggle" onClick={() => toggleDropdown('units')}>
                            <span>Units</span>
                            <span className={`mobile-toggle-icon ${openDropdown === 'units' ? 'open' : ''}`}>+</span>
                        </button>
                        <div className={`mobile-dropdown-menu ${openDropdown === 'units' ? 'open' : ''}`}>
                            <NavLink to="/units#hse" className="mobile-dropdown-item" onClick={() => setIsOpen(false)}>HSE Unit</NavLink>
                            <NavLink to="/units#it" className="mobile-dropdown-item" onClick={() => setIsOpen(false)}>IT Unit</NavLink>
                            <NavLink to="/units#procurement" className="mobile-dropdown-item" onClick={() => setIsOpen(false)}>Procurement</NavLink>
                            <NavLink to="/units#records" className="mobile-dropdown-item" onClick={() => setIsOpen(false)}>Records Unit</NavLink>
                            <NavLink to="/units#audit" className="mobile-dropdown-item" onClick={() => setIsOpen(false)}>Audit Unit</NavLink>
                        </div>
                    </div>

                    <NavLink to="/projects" className="mobile-nav-link" onClick={() => setIsOpen(false)}>Projects</NavLink>
                    <NavLink to="/services" className="mobile-nav-link" onClick={() => setIsOpen(false)}>Services</NavLink>
                    <NavLink to="/media" className="mobile-nav-link" onClick={() => setIsOpen(false)}>Blog & Media</NavLink>
                    <NavLink to="/contact" className="mobile-nav-link" onClick={() => setIsOpen(false)}>Contact</NavLink>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
