
import React, { useState } from 'react';
import SEO from '../components/SEO';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare } from 'lucide-react';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Thank you for your message. We will get back to you shortly.");
        // Implement actual submission logic here
    };

    return (
        <>
            <div className="page-header">
                <div className="container">
                    <h1>Contact Us</h1>
                    <p>We are here to answer your questions and hear your suggestions.</p>
                </div>
            </div>

            <section className="section container">
                <div className="contact-grid">
                    {/* Contact Info */}
                    <div className="contact-info-card">
                        <h3>Headquarters</h3>

                        <div className="info-item">
                            <MapPin className="info-item-icon" />
                            <div>
                                <strong>Location</strong>
                                <p>Roman Ridge Onyasia cres.<br />GA-060-8458</p>
                            </div>
                        </div>

                        <div className="info-item">
                            <Phone className="info-item-icon" />
                            <div>
                                <strong>Phone</strong>
                                <p>+233 30 273 2534</p>
                            </div>
                        </div>

                        <div className="info-item">
                            <Mail className="info-item-icon" />
                            <div>
                                <strong>Email</strong>
                                <p>info@grda.gov.gh</p>
                            </div>
                        </div>

                        <div className="info-item">
                            <Clock className="info-item-icon" />
                            <div>
                                <strong>Working Hours</strong>
                                <p>Monday - Friday: 8:00 AM - 5:00 PM</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="contact-form-container">
                        <h2 style={{ marginBottom: '24px', color: 'var(--color-primary)' }}>Send us a message</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="form-label">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-input"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-input"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Subject</label>
                                <input
                                    type="text"
                                    name="subject"
                                    className="form-input"
                                    required
                                    value={formData.subject}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Message</label>
                                <textarea
                                    name="message"
                                    className="form-textarea"
                                    required
                                    value={formData.message}
                                    onChange={handleChange}
                                ></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Send Message</button>
                        </form>
                    </div>
                </div>

                {/* Map Placeholder */}
                <div className="map-container">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.970176467332!2d-0.198!3d5.576!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9084b2b7a773%3A0xbed180000000000!2sRidge%2C%20Accra!5e0!3m2!1sen!2sgh!4v1610000000000!5m2!1sen!2sgh"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        title="Google Maps"
                    ></iframe>
                </div>
            </section>
        </>
    );
};

export default Contact;
