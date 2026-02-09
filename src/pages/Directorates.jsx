import React, { useState } from 'react';
import { Users, Briefcase, ChevronRight, Building2 } from 'lucide-react';
import './Directorates.css';

const directorates = [
    {
        id: 1,
        title: "Administration",
        shortTitle: "Admin",
        name: "Godfred Gyan",
        role: "Deputy Director of Administration",
        duty: "Oversees general administrative, logistical, and secretarial support services to ensure efficient daily operations.",
        image: "https://firebasestorage.googleapis.com/v0/b/grda-website.firebasestorage.app/o/Mr%20Gyan.JPG?alt=media&token=b2590d51-fe32-41c1-b425-4a8681e37f36",
        color: "#115E3D"
    },
    {
        id: 2,
        title: "Human Resource",
        shortTitle: "HR",
        name: "Anita Disu",
        role: "Deputy Director of Human Resources",
        duty: "Manages recruitment, staff development, welfare, and industrial relations to maintain a motivated and skilled workforce.",
        image: "https://firebasestorage.googleapis.com/v0/b/grda-website.firebasestorage.app/o/anita.JPG?alt=media&token=43147e76-9071-4068-b90b-91edd711bbd2",
        color: "#1a7251"
    },
    {
        id: 3,
        title: "Policy, Planning & Research",
        shortTitle: "PPRME",
        name: "AL-AMIN IS-HAK AL-HASSAN",
        role: "Director of PPRME",
        duty: "Responsible for strategic planning, policy formulation, research analysis, and monitoring of railway projects and programs.",
        image: "https://firebasestorage.googleapis.com/v0/b/grda-website.firebasestorage.app/o/amin.JPG?alt=media&token=07d70129-68ee-4265-9e70-96f564f07c3f",
        color: "#0d5a3c"
    },
    {
        id: 4,
        title: "Finance",
        shortTitle: "Finance",
        name: "AKWASI ADOMAH-GYABAAH",
        role: "Deputy Director of Finance",
        duty: "Manages the Authority's financial resources, budget preparation, financial reporting, and ensures fiscal discipline.",
        image: "https://firebasestorage.googleapis.com/v0/b/grda-website.firebasestorage.app/o/mr%20gybaah.JPG?alt=media&token=471826c3-838d-4ed1-8007-72d51ea9e7a4",
        color: "#d4a528"
    },
    {
        id: 5,
        title: "Estate & Commercial",
        shortTitle: "Estate",
        name: "EDEM DANKU",
        role: "Deputy Director of Estate & Commercial",
        duty: "Manages railway lands and assets, and develops commercial strategies to maximize revenue from railway operations.",
        image: "https://firebasestorage.googleapis.com/v0/b/grda-website.firebasestorage.app/o/danku.JPG?alt=media&token=6f52cde3-14ce-47d8-a7f8-0c21c2885c35",
        color: "#c4941d"
    },
    {
        id: 6,
        title: "Regulations & Licensing",
        shortTitle: "Regulations",
        name: "DIVINE OKUTU",
        role: "Deputy Director of Regulations",
        duty: "Enforces safety standards, issues operational licenses, and ensures compliance with national and international railway regulations.",
        image: "https://firebasestorage.googleapis.com/v0/b/grda-website.firebasestorage.app/o/okutu.png?alt=media&token=6a0155ae-6d1d-487f-906c-61e1ed477bbc",
        color: "#8b5a2b"
    },
    {
        id: 7,
        title: "Projects Development",
        shortTitle: "Projects",
        name: "NANA OWUSU-ANSAH",
        role: "Director of Projects",
        duty: "Supervises the planning, design, and execution of railway infrastructure projects to ensure timely and quality delivery.",
        image: "https://firebasestorage.googleapis.com/v0/b/grda-website.firebasestorage.app/o/nana%20owusu%20ansah.JPG?alt=media&token=23ffd2da-58d8-4d05-a8cd-8f63fe87de01",
        color: "#2d5a47"
    }
];

const Directorates = () => {
    const [activeCard, setActiveCard] = useState(null);

    return (
        <div className="page-wrapper">
            <div className="page-header">
                <div className="container">
                    <h1>Directorates</h1>
                    <p>The specialized departments working together to achieve the GRDA mandate.</p>
                </div>
            </div>

            <section className="section directorates-section">
                <div className="container">
                    {/* Stats Overview */}
                    <div className="directorates-stats">
                        <div className="stat-item">
                            <Building2 size={24} />
                            <div>
                                <span className="stat-value">{directorates.length}</span>
                                <span className="stat-label">Directorates</span>
                            </div>
                        </div>
                        <div className="stat-item">
                            <Users size={24} />
                            <div>
                                <span className="stat-value">250+</span>
                                <span className="stat-label">Staff Members</span>
                            </div>
                        </div>
                    </div>

                    {/* Premium Grid Layout */}
                    <div className="directorates-grid">
                        {directorates.map((d) => (
                            <div
                                key={d.id}
                                className="directorate-card"
                                style={{ '--card-accent': d.color }}
                            >
                                <div className="card-image-wrapper">
                                    <img src={d.image} alt={d.name} className="card-bg-image" />
                                    <div className="card-overlay"></div>
                                    <div className="card-content">
                                        <div className="director-badge">
                                            <span className="badge-icon">
                                                <Users size={14} />
                                            </span>
                                            <span>{d.role.includes('Deputy') ? 'Deputy Director' : 'Director'}</span>
                                        </div>
                                        <h3 className="card-title">{d.title}</h3>
                                        <div className="card-divider"></div>
                                        <div className="director-info">
                                            <p className="director-name">{d.name}</p>
                                            <p className="director-role">{d.role}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-details">
                                    <div className="detail-item">
                                        <Briefcase className="detail-icon" size={18} />
                                        <p>{d.duty}</p>
                                    </div>
                                    <button className="card-action-btn">
                                        <span>View Department</span>
                                        <ChevronRight size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Directorates;
