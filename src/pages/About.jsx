import React from 'react';
import RailwayHistoryTimeline from '../components/RailwayHistoryTimeline';
import './About.css';

const About = () => {
    return (
        <>
            <div className="page-header">
                <div className="container">
                    <h1>About Us</h1>
                    <p>The custodians of Ghana's railway infrastructure development.</p>
                </div>
            </div>

            <section className="about-section container">
                <div className="about-grid">
                    <div className="about-content">
                        <h2>Our History</h2>
                        <p>
                            The Ghana Railway Development Authority (GRDA) was established under the Railways Act 2008 (Act 779) to promote the development of railways and railway services in Ghana.
                        </p>
                        <p>
                            Our mandate is to hold, administer and improve the railway assets, and promote the development and management of suburban railway. We are the regulator and the asset holder.
                        </p>
                    </div>
                    <div className="about-image">
                        <img
                            src="https://firebasestorage.googleapis.com/v0/b/grda-website.firebasestorage.app/o/train.png?alt=media&token=ce934737-08c8-4e05-8121-0b58237b1349"
                            alt="Railway tracks in Ghana"
                            style={{ borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-premium)' }}
                        />
                    </div>
                </div>

                <div className="vision-mission-grid">
                    <div className="vm-card">
                        <h3>Our Vision</h3>
                        <p>To develop a modern, robust and integrated railway system which serves as a catalyst for economic transformation.</p>
                    </div>
                    <div className="vm-card">
                        <h3>Our Mission</h3>
                        <p>To develop, manage and regulate an efficient, safe and reliable railway network for the transportation of passengers and goods.</p>
                    </div>
                </div>
            </section>

            {/* History Timeline */}
            <section className="section" style={{ backgroundColor: '#F9FAFB' }}>
                <div className="container" style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h2 style={{ color: 'var(--color-primary-dark)' }}>Our Journey Through Time</h2>
                    <p>Key moments that shaped the railway sector in Ghana.</p>
                </div>
                <RailwayHistoryTimeline />
            </section>

            {/* Leadership Section - Placeholders */}
            <section className="section" style={{ backgroundColor: '#fff' }}>
                <div className="container">
                    <div className="section-header">
                        <h2>Leadership</h2>
                        <p>Meet the team driving our vision forward.</p>
                    </div>
                    <div className="team-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                        <div className="team-card" style={{ textAlign: 'center' }}>
                            <div style={{ width: '150px', height: '150px', borderRadius: '50%', backgroundColor: '#e2e8f0', margin: '0 auto 1.5rem', backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/grda-website.firebasestorage.app/o/chief.jpg?alt=media&token=61d0ec33-124d-4e27-83e0-0c781eb9d036)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Dr. Frederick Appoh</h3>
                            <p style={{ color: 'var(--color-primary)', fontWeight: '500' }}>Chief Executive Officer</p>
                        </div>
                        <div className="team-card" style={{ textAlign: 'center' }}>
                            <div style={{ width: '150px', height: '150px', borderRadius: '50%', backgroundColor: '#e2e8f0', margin: '0 auto 1.5rem', backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/grda-website.firebasestorage.app/o/board%20chaiir.heic?alt=media&token=435d190e-46db-4c58-a97d-7cdf5c13c47f)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Board Chairperson</h3>
                            <p style={{ color: 'var(--color-primary)', fontWeight: '500' }}>Governing Board</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Directorates Section */}
            <section className="section" style={{ backgroundColor: '#F9FAFB' }}>
                <div className="container">
                    <div className="section-header">
                        <h2>Directorates & Units</h2>
                        <p>Our organizational structure is designed for efficiency and delivery.</p>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        <div style={{ background: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
                            <h3 style={{ marginBottom: '1rem', borderBottom: '2px solid var(--color-surface-dark)', paddingBottom: '0.5rem' }}>Directorates</h3>
                            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                <li>Administration & Human Resource</li>
                                <li>Finance</li>
                                <li>Research, Planning and MIS</li>
                                <li>Technical Services</li>
                                <li>Legal Affairs</li>
                            </ul>
                        </div>
                        <div style={{ background: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
                            <h3 style={{ marginBottom: '1rem', borderBottom: '2px solid var(--color-surface-dark)', paddingBottom: '0.5rem' }}>Key Units</h3>
                            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                <li>Policy Planning Monitoring and Evaluation</li>
                                <li>Procurement</li>
                                <li>Internal Audit</li>
                                <li>Public Relations</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section" style={{ backgroundColor: '#F3F4F6' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <h2>Core Values</h2>
                    <div className="values-list" style={{ justifyContent: 'center' }}>
                        <div className="value-item">Safety</div>
                        <div className="value-item">Integrity</div>
                        <div className="value-item">Innovation</div>
                        <div className="value-item">Excellence</div>
                        <div className="value-item">Sustainability</div>
                        <div className="value-item">Teamwork</div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default About;
