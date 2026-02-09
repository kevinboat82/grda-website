import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Youtube, MapPin, Phone, Mail } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-accent-bar"></div>

            <div className="container footer-container">
                <div className="footer-column">
                    <div className="footer-logo">
                        <img src="/grda-logo.png" alt="GRDA Logo" className="logo-image-footer" />
                        <h3>GRDA</h3>
                    </div>
                    <p className="footer-description">
                        Ghana Railway Development Authority.<br />
                        Building a world-class railway network for Ghana's future prosperity and sustainable development.
                    </p>
                    <div className="footer-socials">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                            <Facebook size={18} />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                            <Twitter size={18} />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                            <Linkedin size={18} />
                        </a>
                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                            <Youtube size={18} />
                        </a>
                    </div>
                </div>

                <div className="footer-column">
                    <h3>Quick Links</h3>
                    <div className="footer-links">
                        <Link to="/about" className="footer-link">About Us</Link>
                        <Link to="/directorates" className="footer-link">Directorates</Link>
                        <Link to="/projects" className="footer-link">Projects</Link>
                        <Link to="/services" className="footer-link">Services</Link>
                        <Link to="/contact" className="footer-link">Contact</Link>
                    </div>
                </div>

                <div className="footer-column">
                    <h3>Resources</h3>
                    <div className="footer-links">
                        <Link to="/media" className="footer-link">Press Releases</Link>
                        <Link to="/services" className="footer-link">Regulations</Link>
                        <Link to="/services" className="footer-link">Licensing</Link>
                        <Link to="/media" className="footer-link">Gallery</Link>
                        <Link to="/admin/login" className="footer-link">Staff Login</Link>
                    </div>
                </div>

                <div className="footer-column">
                    <h3>Contact Us</h3>
                    <div className="footer-links" style={{ gap: '1rem' }}>
                        <div className="contact-item">
                            <div className="contact-icon">
                                <MapPin size={16} />
                            </div>
                            <span>Roman Ridge Onyasia Cres.<br />GA-060-8458, Accra</span>
                        </div>
                        <div className="contact-item">
                            <div className="contact-icon">
                                <Phone size={16} />
                            </div>
                            <span>+233 30 273 2534</span>
                        </div>
                        <div className="contact-item">
                            <div className="contact-icon">
                                <Mail size={16} />
                            </div>
                            <span>info@grda.gov.gh</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container footer-bottom">
                <p>&copy; {new Date().getFullYear()} Ghana Railway Development Authority. All rights reserved.</p>
                <div className="footer-bottom-links">
                    <Link to="/privacy">Privacy Policy</Link>
                    <Link to="/terms">Terms of Service</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
