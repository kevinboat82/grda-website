import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { ArrowUpRight, MapPin } from 'lucide-react';
import InteractiveMap from '../components/InteractiveMap';
import './Projects.css';

// Fallback data when Firestore is empty
export const fallbackProjects = [
    {
        id: 'fallback-1',
        title: "Tema - Mpakadan Standard Gauge",
        category: "Ongoing Projects",
        status: "Ongoing",
        completionPercentage: 75,
        image: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        coverImage: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "A 97km strategic railway line connecting the Tema Port to the Lake Transport network at Mpakadan.",
        location: "Tema - Mpakadan",
        galleryImages: []
    },
    {
        id: 'fallback-2',
        title: "Western Railway Line",
        category: "Ongoing Projects",
        status: "Ongoing",
        completionPercentage: 45,
        image: "https://plus.unsplash.com/premium_photo-1661908853676-e9e4407b4618?q=80&w=2970&auto=format&fit=crop",
        coverImage: "https://plus.unsplash.com/premium_photo-1661908853676-e9e4407b4618?q=80&w=2970&auto=format&fit=crop",
        description: "Major rehabilitation of the Western Line to facilitate the transport of manganese and bauxite.",
        location: "Takoradi - Kumasi",
        galleryImages: []
    },
    {
        id: 'fallback-3',
        title: "Accra - Nsawam Line",
        category: "Completed Projects",
        status: "Completed",
        completionPercentage: 100,
        image: "https://images.unsplash.com/photo-1541427468627-a89a96e5ca1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        coverImage: "https://images.unsplash.com/photo-1541427468627-a89a96e5ca1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Revitalization of the commuter line to ease traffic congestion in the capital and provide affordable transport.",
        location: "Accra - Nsawam",
        galleryImages: []
    },
    {
        id: 'fallback-4',
        title: "Kumasi - Paga Central Spine",
        category: "Upcoming Projects",
        status: "Proposed",
        completionPercentage: 10,
        image: "https://images.unsplash.com/photo-1507590804791-4560fbadb941?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        coverImage: "https://images.unsplash.com/photo-1507590804791-4560fbadb941?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "A major north-south connector that will link the central part of Ghana to the northern border.",
        location: "Kumasi - Paga",
        galleryImages: []
    },
    {
        id: 'fallback-5',
        title: "Eastern Railway Line",
        category: "Upcoming Projects",
        status: "Planning",
        completionPercentage: 5,
        image: "https://images.unsplash.com/photo-1563804822602-99884638706d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        coverImage: "https://images.unsplash.com/photo-1563804822602-99884638706d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Reconstruction of the Eastern Line to boost economic activities in the Eastern and Ashanti regions.",
        location: "Accra - Kumasi",
        galleryImages: []
    },
    {
        id: 'fallback-6',
        title: "Achimota - Kotoku Line",
        category: "Completed Projects",
        status: "Completed",
        completionPercentage: 100,
        image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        coverImage: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Construction of double track line to improve commuter services.",
        location: "Achimota - Kotoku",
        galleryImages: []
    }
];

const Projects = () => {
    const navigate = useNavigate();
    const [filter, setFilter] = useState('All');
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'projects'));
            const projectsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            if (projectsData.length > 0) {
                setProjects(projectsData);
            } else {
                setProjects(fallbackProjects);
            }
        } catch (error) {
            console.error('Error fetching projects:', error);
            setProjects(fallbackProjects);
        } finally {
            setLoading(false);
        }
    };

    const filteredProjects = filter === 'All'
        ? projects
        : projects.filter(p => p.category === filter);

    const handleProjectClick = (id) => {
        navigate(`/projects/${id}`);
    };

    const getProgressColor = (percentage) => {
        if (percentage >= 100) return '#22c55e';
        if (percentage >= 50) return '#f59e0b';
        return '#3b82f6';
    };

    if (loading) {
        return (
            <div className="page-header">
                <div className="container" style={{ textAlign: 'center', padding: '4rem' }}>
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    <p style={{ marginTop: '1rem' }}>Loading projects...</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="page-header">
                <div className="container">
                    <h1>Our Projects</h1>
                    <p>Transforming Ghana's transportation landscape through strategic infrastructure development.</p>
                </div>
            </div>

            <div className="container" style={{ marginTop: '-4rem', position: 'relative', zIndex: 10, marginBottom: '4rem' }}>
                <InteractiveMap />
            </div>

            <div className="projects-page container">
                <div className="projects-filter">
                    {['All', 'Ongoing Projects', 'Completed Projects', 'Upcoming Projects',].map(f => (
                        <button
                            key={f}
                            className={`filter-btn ${filter === f ? 'active' : ''}`}
                            onClick={() => setFilter(f)}
                        >
                            {f === 'Railway Master Plan' ? 'Master Plan' : f}
                        </button>
                    ))}
                </div>

                <div className="projects-grid">
                    {filteredProjects.map(project => (
                        <div
                            key={project.id}
                            className="project-card-detail"
                            onClick={() => handleProjectClick(project.id)}
                            style={{ cursor: 'pointer' }}
                        >
                            <div
                                className="project-card-image"
                                style={{ backgroundImage: `url('${project.coverImage || project.image}')` }}
                            >
                                {/* Progress Badge */}
                                <div className="project-progress-badge">
                                    <span style={{ color: getProgressColor(project.completionPercentage || 0) }}>
                                        {project.completionPercentage || 0}%
                                    </span>
                                </div>
                            </div>
                            <div className="project-card-body">
                                <div className="project-meta">
                                    <span>{project.category}</span>
                                    <span style={{
                                        color: project.status === 'Completed' ? 'var(--color-primary)'
                                            : project.status === 'Ongoing' ? '#D97706' : 'var(--color-text-muted)'
                                    }}>
                                        {project.status}
                                    </span>
                                </div>
                                <h3 className="project-title">{project.title}</h3>

                                {/* Progress Bar */}
                                <div className="project-progress-bar">
                                    <div
                                        className="project-progress-fill"
                                        style={{
                                            width: `${project.completionPercentage || 0}%`,
                                            backgroundColor: getProgressColor(project.completionPercentage || 0)
                                        }}
                                    ></div>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '8px', color: '#6B7280', fontSize: '0.875rem' }}>
                                    <MapPin size={14} />
                                    <span>{project.location}</span>
                                </div>
                                <p className="project-desc">{project.description}</p>
                                <span className="project-link">
                                    View Case Study <ArrowUpRight size={16} />
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};
export default Projects;
