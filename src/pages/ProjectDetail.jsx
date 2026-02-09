import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { MapPin, Calendar, DollarSign, Clock, ArrowLeft, Layers } from 'lucide-react';
import './ProjectDetail.css';

// Fallback data (same as in Projects.jsx for consistency if DB fails or id matches fallback)
import { fallbackProjects } from './Projects';

const ProjectDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProject = async () => {
            // Check if it's a fallback ID first
            if (id.startsWith('fallback-')) {
                const found = fallbackProjects.find(p => p.id === id);
                if (found) {
                    setProject(found);
                    setLoading(false);
                    return;
                }
            }

            try {
                const docRef = doc(db, 'projects', id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setProject({ id: docSnap.id, ...docSnap.data() });
                } else {
                    // Try finding in fallback if not in DB (handling hybrid state)
                    const found = fallbackProjects.find(p => p.id === id);
                    if (found) setProject(found);
                }
            } catch (error) {
                console.error("Error fetching project:", error);
                const found = fallbackProjects.find(p => p.id === id);
                if (found) setProject(found);
            } finally {
                setLoading(false);
            }
        };

        fetchProject();
        window.scrollTo(0, 0);
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="container py-20 text-center">
                <h2>Project Not Found</h2>
                <button onClick={() => navigate('/projects')} className="text-primary mt-4 font-bold">
                    Go Back to Projects
                </button>
            </div>
        );
    }

    // Determine completion color
    const getProgressColor = (percentage) => {
        if (percentage >= 100) return '#22c55e';
        if (percentage >= 50) return '#f59e0b';
        return '#3b82f6';
    };

    const completion = project.completionPercentage || 0;

    return (
        <div className="project-detail-page">
            {/* Hero Section */}
            <div className="project-hero">
                <div
                    className="project-hero-bg"
                    style={{ backgroundImage: `url(${project.coverImage || project.image})` }}
                ></div>
                <div className="project-hero-overlay"></div>

                <div className="project-hero-content">
                    <span className="project-category-badge">{project.category}</span>
                    <h1>{project.title}</h1>
                    <div className="project-location">
                        <MapPin size={24} className="text-secondary" />
                        <span>{project.location}</span>
                    </div>
                </div>
            </div>

            <div className="container">
                {/* Stats Strip */}
                <div className="project-stats-strip">
                    <div className="project-stat-item">
                        <span className="p-stat-value" style={{ color: getProgressColor(completion) }}>{completion}%</span>
                        <span className="p-stat-label">Completion</span>
                    </div>
                    <div className="project-stat-item">
                        <span className="p-stat-value">{project.length || 'N/A'}</span>
                        <span className="p-stat-label">Distance (km)</span>
                    </div>
                    <div className="project-stat-item">
                        <span className="p-stat-value">{project.status}</span>
                        <span className="p-stat-label">Current Status</span>
                    </div>
                    <div className="project-stat-item">
                        <span className="p-stat-value">{project.budget || 'TBD'}</span>
                        <span className="p-stat-label">Est. Budget</span>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="project-content-section content-grid">
                    {/* Left: Article */}
                    <div className="main-article">
                        <h2>Project Overview</h2>
                        <p>{project.description}</p>

                        {/* Extended content placeholders (would come from DB in real rich text scenario) */}
                        <h3>Strategic Importance</h3>
                        <p>
                            This project represents a critical component of the Ghana Railway Master Plan.
                            By connecting key economic hubs, it will facilitate the efficient transport of
                            goods and passengers, reducing travel times and road congestion.
                        </p>

                        <h3>Key Features</h3>
                        <ul className="list-disc pl-5 space-y-2 mb-8 text-gray-700">
                            <li>Modern Standard Gauge Railway specifications.</li>
                            <li>State-of-the-art signalling and telecommunication systems.</li>
                            <li>Construction of new passenger stations and freight terminals.</li>
                            <li>Environmental impact mitigation measures.</li>
                        </ul>

                        {/* Gallery */}
                        {(project.galleryImages && project.galleryImages.length > 0) && (
                            <>
                                <h2>Project Gallery</h2>
                                <div className="project-gallery-grid">
                                    {[project.image, ...project.galleryImages].slice(0, 6).map((img, idx) => (
                                        <div key={idx} className="gallery-item">
                                            <img src={img} alt={`Gallery ${idx}`} />
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>

                    {/* Right: Sidebar Meta */}
                    <div className="project-sidebar">
                        <div className="project-sidebar-card">
                            <h3 className="sidebar-title">
                                <Layers size={20} className="text-primary" />
                                Project Details
                            </h3>
                            <ul className="project-meta-list">
                                <li className="meta-item">
                                    <span className="meta-label">Start Date</span>
                                    <span className="meta-value">{project.startDate || '2023'}</span>
                                </li>
                                <li className="meta-item">
                                    <span className="meta-label">Est. Completion</span>
                                    <span className="meta-value">{project.endDate || '2026'}</span>
                                </li>
                                <li className="meta-item">
                                    <span className="meta-label">Contractor</span>
                                    <span className="meta-value">{project.contractor || 'Multiple'}</span>
                                </li>
                                <li className="meta-item">
                                    <span className="meta-label">Funding</span>
                                    <span className="meta-value">{project.funding || 'Government of Ghana'}</span>
                                </li>
                            </ul>
                        </div>

                        <button
                            onClick={() => navigate('/projects')}
                            className="mt-6 flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-gray-300 font-bold hover:bg-gray-50 transition-colors"
                        >
                            <ArrowLeft size={20} />
                            Back to All Projects
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetail;
