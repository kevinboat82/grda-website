import React, { useState } from 'react';
import SEO from '../components/SEO';
import { Users, Briefcase, ChevronRight, Building2 } from 'lucide-react';
import './Directorates.css';

const directorates = [
    {
        id: 1,
        title: "Policy, Planning & Research",
        shortTitle: "PPRME",
        name: "AL-AMIN IS-HAK AL-HASSAN",
        role: "Director of PPRME",
        duty: "Responsible for strategic planning, policy formulation, research analysis, and monitoring of railway projects and programs.",
        responsibilities: [
            "Formulate and review policies for the railway sector.",
            "Coordinate the preparation of the Railway Master Plan.",
            "Conduct research and data analysis to support decision-making.",
            "Monitor and evaluate the implementation of railway projects.",
            "Collaborate with development partners and stakeholders."
        ],
        image: "https://firebasestorage.googleapis.com/v0/b/grda-website.firebasestorage.app/o/amin.JPG?alt=media&token=07d70129-68ee-4265-9e70-96f564f07c3f",
        color: "#0d5a3c"
    },
    {
        id: 2,
        title: "Projects Development",
        shortTitle: "Projects",
        name: "NANA OWUSU-ANSAH",
        role: "Director of Projects",
        duty: "Supervises the planning, design, and execution of railway infrastructure projects to ensure timely and quality delivery.",
        responsibilities: [
            "Oversee the engineering design and specifications of railway infrastructure.",
            "Supervise construction and rehabilitation works.",
            "Ensure compliance with engineering standards and safety codes.",
            "Manage project timelines, budgets, and contractors.",
            "Conduct technical feasibility studies for new lines."
        ],
        image: "https://firebasestorage.googleapis.com/v0/b/grda-website.firebasestorage.app/o/nana%20owusu%20ansah.JPG?alt=media&token=23ffd2da-58d8-4d05-a8cd-8f63fe87de01",
        color: "#2d5a47"
    },
    {
        id: 3,
        title: "Human Resource",
        shortTitle: "HR",
        name: "Anita Disu",
        role: "Deputy Director of Human Resources",
        duty: "Manages recruitment, staff development, welfare, and industrial relations to maintain a motivated and skilled workforce.",
        responsibilities: [
            "Manage recruitment, selection, and placement of staff.",
            "Coordinate training and professional development programs.",
            "Administer staff welfare, compensation, and benefits.",
            "Handle employee relations and grievance resolution.",
            "Ensure compliance with labor laws and HR policies."
        ],
        image: "https://firebasestorage.googleapis.com/v0/b/grda-website.firebasestorage.app/o/anita.JPG?alt=media&token=43147e76-9071-4068-b90b-91edd711bbd2",
        color: "#1a7251"
    },
    {
        id: 4,
        title: "Finance",
        shortTitle: "Finance",
        name: "AKWASI ADOMAH-GYABAAH",
        role: "Deputy Director of Finance",
        duty: "Manages the Authority's financial resources, budget preparation, financial reporting, and ensures fiscal discipline.",
        responsibilities: [
            "Prepare annual budgets and financial forecasts.",
            "Manage the Authority's treasury and cash flow.",
            "Ensure compliance with financial regulations and auditing standards.",
            "Prepare financial statements and reports for stakeholders.",
            "Oversee payroll administration and supplier payments."
        ],
        image: "https://firebasestorage.googleapis.com/v0/b/grda-website.firebasestorage.app/o/mr%20gybaah.JPG?alt=media&token=471826c3-838d-4ed1-8007-72d51ea9e7a4",
        color: "#d4a528"
    },
    {
        id: 5,
        title: "Revenue Mobilisation & Estate",
        shortTitle: "Estate",
        name: "John Apagya Quayson",
        role: "Head of Revenue Mobilisation and Estates",
        duty: "Manages railway lands and assets, and develops commercial strategies to maximize revenue from railway operations.",
        responsibilities: [
            "Manage and document railway lands and assets.",
            "Administer leases and licenses for railway property.",
            "Develop strategies to maximize non-operational revenue.",
            "Oversee the maintenance of GRDA real estate.",
            "Resolve land encroachment and disputes."
        ],
        image: "https://firebasestorage.googleapis.com/v0/b/grda-website.firebasestorage.app/o/Quayson.jpeg?alt=media&token=d8860ebf-1cd7-43df-b42a-26535e6c56e7",
        color: "#c4941d"
    },
    {
        id: 6,
        title: "Regulations & Licensing",
        shortTitle: "Regulations",
        name: "DIVINE OKUTU",
        role: "Deputy Director of Regulations",
        duty: "Enforces safety standards, issues operational licenses, and ensures compliance with national and international railway regulations.",
        responsibilities: [
            "Develop and enforce railway safety standards and regulations.",
            "Issue licenses to railway operators and personnel.",
            "Inspect railway infrastructure and rolling stock.",
            "Investigate railway accidents and incidents.",
            "Monitor compliance with environmental and technical standards."
        ],
        image: "https://firebasestorage.googleapis.com/v0/b/grda-website.firebasestorage.app/o/okutu.png?alt=media&token=6a0155ae-6d1d-487f-906c-61e1ed477bbc",
        color: "#8b5a2b"
    },
    {
        id: 7,
        title: "Administration",
        shortTitle: "Admin",
        name: "Godfred Gyan",
        role: "Deputy Director of Administration",
        duty: "Oversees general administrative, logistical, and secretarial support services to ensure efficient daily operations.",
        responsibilities: [
            "Manage procurement and supply chain processes.",
            "Oversee transport and fleet management.",
            "Ensure efficient records management and secretarial services.",
            "Coordinate facilities management and general office administration.",
            "Support the organization of official events and meetings."
        ],
        image: "https://firebasestorage.googleapis.com/v0/b/grda-website.firebasestorage.app/o/Mr%20Gyan.JPG?alt=media&token=b2590d51-fe32-41c1-b425-4a8681e37f36",
        color: "#115E3D"
    },
];

const Directorates = () => {
    const [activeCard, setActiveCard] = useState(null);

    const getBadgeTitle = (role) => {
        if (role.toLowerCase().includes('head')) return 'Head of Dept';
        if (role.toLowerCase().includes('deputy')) return 'Deputy Director';
        if (role.toLowerCase().includes('director')) return 'Director';
        return 'Management';
    };

    return (
        <div className="page-wrapper">
            <SEO
                title="Directorates"
                description="Meet the specialized directorates and leadership team driving the Ghana Railway Development Authority's mission."
                url="/directorates"
            />
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
                                <span className="stat-value">80+</span>
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
                                            <span>{getBadgeTitle(d.role)}</span>
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
                                    <button
                                        className="card-action-btn"
                                        onClick={() => setActiveCard(d)}
                                    >
                                        <span>View Duties</span>
                                        <ChevronRight size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Duties Modal */}
            {activeCard && (
                <div className="modal-overlay" onClick={() => setActiveCard(null)}>
                    <div className="modal-content directorate-modal" onClick={e => e.stopPropagation()}>
                        <div className="modal-header" style={{ backgroundColor: activeCard.color }}>
                            <h2>{activeCard.title}</h2>
                            <button className="modal-close" onClick={() => setActiveCard(null)}>×</button>
                        </div>
                        <div className="modal-body">
                            <div className="modal-director-intro">
                                <img src={activeCard.image} alt={activeCard.name} className="modal-director-img" />
                                <div>
                                    <h3>{activeCard.name}</h3>
                                    <p className="role-text">{activeCard.role}</p>
                                    <span className="badge-sm">{getBadgeTitle(activeCard.role)}</span>
                                </div>
                            </div>

                            <div className="modal-responsibilities">
                                <h4>Key Duties & Responsibilities</h4>
                                <ul className="responsibilities-list">
                                    {activeCard.responsibilities.map((resp, idx) => (
                                        <li key={idx}>
                                            <div className="list-dot" style={{ backgroundColor: activeCard.color }}></div>
                                            <span>{resp}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Directorates;
