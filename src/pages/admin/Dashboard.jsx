import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import { Link } from 'react-router-dom';
import { Plus, Trash2, Pencil, FolderOpen, FileText, Image as ImageIcon } from 'lucide-react';
import MediaManager from './MediaManager';
import './Admin.css';

const Dashboard = () => {
    const [stories, setStories] = useState([]);
    const [projects, setProjects] = useState([]);
    const [mediaCount, setMediaCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('stories');

    const fetchData = async () => {
        setLoading(true);
        try {
            const storiesSnapshot = await getDocs(collection(db, "stories"));
            const storiesData = storiesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setStories(storiesData);

            const projectsSnapshot = await getDocs(collection(db, "projects"));
            const projectsData = projectsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setProjects(projectsData);

            const mediaSnapshot = await getDocs(collection(db, "media_gallery"));
            setMediaCount(mediaSnapshot.size);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDeleteStory = async (id) => {
        if (window.confirm("Are you sure you want to delete this story?")) {
            try {
                await deleteDoc(doc(db, "stories", id));
                fetchData();
            } catch (error) {
                console.error("Error deleting story:", error);
            }
        }
    };

    const handleDeleteProject = async (id) => {
        if (window.confirm("Are you sure you want to delete this project?")) {
            try {
                await deleteDoc(doc(db, "projects", id));
                fetchData();
            } catch (error) {
                console.error("Error deleting project:", error);
            }
        }
    };

    if (loading) return <div className="admin-dashboard"><p>Loading...</p></div>;

    return (
        <div className="admin-dashboard">
            <h1>Dashboard</h1>

            {/* Overview Stats */}
            <div className="stats-grid">
                <div className="stat-card" onClick={() => setActiveTab('stories')}>
                    <div className="stat-icon stories">
                        <FileText size={24} />
                    </div>
                    <div className="stat-info">
                        <h3>Stories</h3>
                        <p>{stories.length}</p>
                    </div>
                </div>
                <div className="stat-card" onClick={() => setActiveTab('projects')}>
                    <div className="stat-icon projects">
                        <FolderOpen size={24} />
                    </div>
                    <div className="stat-info">
                        <h3>Projects</h3>
                        <p>{projects.length}</p>
                    </div>
                </div>
                <div className="stat-card" onClick={() => setActiveTab('media')}>
                    <div className="stat-icon media">
                        <ImageIcon size={24} />
                    </div>
                    <div className="stat-info">
                        <h3>Media Items</h3>
                        <p>{mediaCount}</p>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="admin-tabs">
                <button
                    onClick={() => setActiveTab('stories')}
                    className={`admin-tab ${activeTab === 'stories' ? 'active' : ''}`}
                >
                    <FileText size={18} />
                    Stories
                </button>
                <button
                    onClick={() => setActiveTab('projects')}
                    className={`admin-tab ${activeTab === 'projects' ? 'active' : ''}`}
                >
                    <FolderOpen size={18} />
                    Projects
                </button>
                <button
                    onClick={() => setActiveTab('media')}
                    className={`admin-tab ${activeTab === 'media' ? 'active' : ''}`}
                >
                    <ImageIcon size={18} />
                    Media Gallery
                </button>
            </div>

            {/* Stories Tab */}
            {activeTab === 'stories' && (
                <>
                    <div className="admin-actions">
                        <Link to="/admin/stories/new" className="btn btn-primary">
                            <Plus size={18} /> Add Story
                        </Link>
                    </div>

                    {/* Desktop Table */}
                    <div className="admin-table-wrapper">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th style={{ textAlign: 'right' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stories.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="empty-state">
                                            No stories found. Create one to get started.
                                        </td>
                                    </tr>
                                ) : (
                                    stories.map(story => (
                                        <tr key={story.id}>
                                            <td>
                                                <img src={story.image} alt={story.title} className="table-image" />
                                            </td>
                                            <td className="table-title">{story.title}</td>
                                            <td className="table-desc">{story.description}</td>
                                            <td>
                                                <div className="table-actions">
                                                    <Link to={`/admin/stories/edit/${story.id}`} className="action-btn edit" title="Edit">
                                                        <Pencil size={18} />
                                                    </Link>
                                                    <button onClick={() => handleDeleteStory(story.id)} className="action-btn delete" title="Delete">
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Cards */}
                    <div className="mobile-cards">
                        {stories.length === 0 ? (
                            <div className="empty-state">No stories found. Create one to get started.</div>
                        ) : (
                            stories.map(story => (
                                <div key={story.id} className="mobile-card">
                                    <div className="mobile-card-header">
                                        <img src={story.image} alt={story.title} className="mobile-card-image" />
                                        <div className="mobile-card-info">
                                            <div className="mobile-card-title">{story.title}</div>
                                            <div className="mobile-card-meta">{story.category || 'Story'}</div>
                                        </div>
                                    </div>
                                    <div className="mobile-card-desc">{story.description}</div>
                                    <div className="mobile-card-footer">
                                        <span></span>
                                        <div className="mobile-card-actions">
                                            <Link to={`/admin/stories/edit/${story.id}`} className="action-btn edit">
                                                <Pencil size={18} />
                                            </Link>
                                            <button onClick={() => handleDeleteStory(story.id)} className="action-btn delete">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </>
            )}

            {/* Projects Tab */}
            {activeTab === 'projects' && (
                <>
                    <div className="admin-actions">
                        <Link to="/admin/projects/new" className="btn btn-primary">
                            <Plus size={18} /> Add Project
                        </Link>
                    </div>

                    {/* Desktop Table */}
                    <div className="admin-table-wrapper">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Title</th>
                                    <th>Category</th>
                                    <th>Progress</th>
                                    <th style={{ textAlign: 'right' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="empty-state">
                                            No projects found. Create one to get started.
                                        </td>
                                    </tr>
                                ) : (
                                    projects.map(project => (
                                        <tr key={project.id}>
                                            <td>
                                                {project.coverImage ? (
                                                    <img src={project.coverImage} alt={project.title} className="table-image" />
                                                ) : (
                                                    <div className="table-image" style={{ background: '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <FolderOpen size={20} color="#9ca3af" />
                                                    </div>
                                                )}
                                            </td>
                                            <td className="table-title">{project.title}</td>
                                            <td>{project.category}</td>
                                            <td>
                                                <div className="progress-cell">
                                                    <div className="progress-bar">
                                                        <div
                                                            className="progress-fill"
                                                            style={{
                                                                width: `${project.completionPercentage || 0}%`,
                                                                background: project.completionPercentage >= 100 ? '#22c55e' : 'var(--color-primary)'
                                                            }}
                                                        />
                                                    </div>
                                                    <span className="progress-text">{project.completionPercentage || 0}%</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="table-actions">
                                                    <Link to={`/admin/projects/edit/${project.id}`} className="action-btn edit" title="Edit">
                                                        <Pencil size={18} />
                                                    </Link>
                                                    <button onClick={() => handleDeleteProject(project.id)} className="action-btn delete" title="Delete">
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Cards */}
                    <div className="mobile-cards">
                        {projects.length === 0 ? (
                            <div className="empty-state">No projects found. Create one to get started.</div>
                        ) : (
                            projects.map(project => (
                                <div key={project.id} className="mobile-card">
                                    <div className="mobile-card-header">
                                        {project.coverImage ? (
                                            <img src={project.coverImage} alt={project.title} className="mobile-card-image" />
                                        ) : (
                                            <div className="mobile-card-image" style={{ background: '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <FolderOpen size={24} color="#9ca3af" />
                                            </div>
                                        )}
                                        <div className="mobile-card-info">
                                            <div className="mobile-card-title">{project.title}</div>
                                            <div className="mobile-card-meta">{project.category}</div>
                                        </div>
                                    </div>
                                    <div className="mobile-card-footer">
                                        <div className="progress-cell">
                                            <div className="progress-bar">
                                                <div
                                                    className="progress-fill"
                                                    style={{
                                                        width: `${project.completionPercentage || 0}%`,
                                                        background: project.completionPercentage >= 100 ? '#22c55e' : 'var(--color-primary)'
                                                    }}
                                                />
                                            </div>
                                            <span className="progress-text">{project.completionPercentage || 0}%</span>
                                        </div>
                                        <div className="mobile-card-actions">
                                            <Link to={`/admin/projects/edit/${project.id}`} className="action-btn edit">
                                                <Pencil size={18} />
                                            </Link>
                                            <button onClick={() => handleDeleteProject(project.id)} className="action-btn delete">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </>
            )}

            {/* Media Tab */}
            {activeTab === 'media' && (
                <div style={{ marginTop: '1rem' }}>
                    <MediaManager />
                </div>
            )}
        </div>
    );
};

export default Dashboard;
