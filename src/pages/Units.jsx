import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Activity, Server, ShoppingCart, FileText, ClipboardCheck, ChevronRight, CheckCircle, Trophy } from 'lucide-react';
import './Units.css';

const units = [
    {
        id: "hse",
        title: "Health, Safety & Environment",
        shortTitle: "HSE Unit",
        icon: Activity,
        overview: "The HSE Unit is responsible for ensuring that all railway operations and projects adhere to the highest standards of health, safety, and environmental protection, creating a zero-harm workplace.",
        tasks: [
            "Develop and enforce safety policies and procedures for railway operations.",
            "Conduct regular safety audits and risk assessments of railway infrastructure.",
            "Monitor environmental impact of railway projects and ensure compliance with EPA regulations.",
            "Organize safety training programs for staff and stakeholders."
        ],
        performance: "Maintained a safety compliance rate of 98% in ongoing projects and successfully conducted 12 operational safety audits in the last fiscal year."
    },
    {
        id: "it",
        title: "Information Technology",
        shortTitle: "IT Unit",
        icon: Server,
        overview: "The IT Unit provides the technological backbone for the Authority, managing digital infrastructure, cybersecurity, and software solutions to drive operational efficiency.",
        tasks: [
            "Maintain and upgrade the Authority's network infrastructure and data centers.",
            "Develop and manage internal software applications for administrative efficiency.",
            "Ensure data security and implement robust cybersecurity measures.",
            "Provide technical support and IT training to all departments."
        ],
        performance: "Successfully implemented a new digitized document management system and achieved 99.9% network uptime across all regional offices."
    },
    {
        id: "procurement",
        title: "Procurement",
        shortTitle: "Procurement",
        icon: ShoppingCart,
        overview: "The Procurement Unit manages the acquisition of goods, works, and services to ensure value for money and compliance with the Public Procurement Act.",
        tasks: [
            "Prepare and implement the Authority's annual procurement plan.",
            "Manage tendering processes for railway infrastructure projects.",
            "Evaluate bids and negotiate contracts with suppliers and contractors.",
            "Ensure transparency and accountability in all procurement activities."
        ],
        performance: "Processed over 50 major operational contracts with 100% compliance to public procurement guidelines and achieved significant cost savings through strategic sourcing."
    },
    {
        id: "records",
        title: "Records & Information",
        shortTitle: "Records Unit",
        icon: FileText,
        overview: "The Records Unit ensures the proper creation, maintenance, use, and disposal of the Authority's records and information assets, preserving institutional memory.",
        tasks: [
            "Manage the classification, indexing, and storage of official documents.",
            "Digitize historical railway records for preservation and easy access.",
            "Implement records management policies to ensure information security.",
            "Facilitate timely access to information for decision-making."
        ],
        performance: "Digitized over 10,000 historical railway documents and reduced document retrieval time by 60%."
    },
    {
        id: "audit",
        title: "Internal Audit",
        shortTitle: "Audit Unit",
        icon: ClipboardCheck,
        overview: "The Audit Unit provides independent and objective assurance on the effectiveness of the Authority's risk management, control, and governance processes.",
        tasks: [
            "Conduct internal audits of financial and operational activities.",
            "Evaluate the effectiveness of internal controls and recommend improvements.",
            "Investigate compliance with applicable laws, regulations, and policies.",
            "Report audit findings to the Board and Management."
        ],
        performance: "Completed all scheduled quarterly audits and provided key recommendations that improved financial control systems by 25%."
    }
];

const Units = () => {
    const { hash } = useLocation();
    const [activeUnitId, setActiveUnitId] = useState(units[0].id);

    useEffect(() => {
        if (hash) {
            const id = hash.replace('#', '');
            const unitExists = units.find(u => u.id === id);
            if (unitExists) {
                setActiveUnitId(id);
                // Optional: Scroll to top of layout if deep linking
                const element = document.getElementById('units-layout');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [hash]);

    const activeUnit = units.find(u => u.id === activeUnitId) || units[0];
    const ActiveIcon = activeUnit.icon;

    return (
        <div className="units-page-wrapper">
            <div className="page-header">
                <div className="container">
                    <h1>Specialized Units</h1>
                    <p>Dedicated teams ensuring operational excellence, compliance, and support across the Authority.</p>
                </div>
            </div>

            <div className="container" id="units-layout">
                <div className="units-layout">
                    {/* Sidebar / Tabs */}
                    <div className="units-sidebar">
                        {units.map((unit) => {
                            const Icon = unit.icon;
                            return (
                                <button
                                    key={unit.id}
                                    className={`unit-nav-btn ${activeUnitId === unit.id ? 'active' : ''}`}
                                    onClick={() => setActiveUnitId(unit.id)}
                                >
                                    <Icon size={20} className="unit-nav-icon" />
                                    <span>{unit.shortTitle}</span>
                                    {activeUnitId === unit.id && <ChevronRight size={16} style={{ marginLeft: 'auto' }} />}
                                </button>
                            );
                        })}
                    </div>

                    {/* Main Content */}
                    <div className="unit-content-area">
                        <div key={activeUnit.id} className="unit-detail-card">
                            <div className="unit-detail-header">
                                <ActiveIcon strokeWidth={1} />
                                <h2>{activeUnit.title}</h2>
                                <p className="unit-detail-overview">{activeUnit.overview}</p>
                            </div>

                            <div className="unit-detail-body">
                                {/* Tasks Section */}
                                <div>
                                    <h3 className="section-title">
                                        <Activity size={20} className="text-primary" />
                                        Core Responsibilities
                                    </h3>
                                    <ul className="tasks-list">
                                        {activeUnit.tasks.map((task, i) => (
                                            <li key={i} className="task-item">
                                                <CheckCircle size={18} className="task-check" />
                                                <span>{task}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Performance Highlight */}
                                <div className="performance-box">
                                    <Trophy size={48} className="performance-icon" />
                                    <div className="section-title" style={{ marginBottom: '1rem' }}>
                                        Key Achievement
                                    </div>
                                    <p className="performance-quote">
                                        "{activeUnit.performance}"
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Units;
