import React, { useEffect, useMemo, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import { Link } from 'react-router-dom';
import {
    Plus,
    Trash2,
    Pencil,
    FolderOpen,
    FileText,
    Image as ImageIcon,
    Megaphone,
    Search,
    ArrowRight,
    Newspaper,
    FolderKanban,
} from 'lucide-react';
import MediaManager from './MediaManager';
import './Admin.css';

const Dashboard = () => {
    const [stories, setStories] = useState([]);
    const [projects, setProjects] = useState([]);
    const [mediaCount, setMediaCount] = useState(0);
    const [bulletinCount, setBulletinCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('stories');
    const [query, setQuery] = useState('');

    const fetchData = async () => {
        setLoading(true);
        try {
            const storiesSnapshot = await getDocs(collection(db, 'stories'));
            setStories(storiesSnapshot.docs.map((d) => ({ id: d.id, ...d.data() })));

            const projectsSnapshot = await getDocs(collection(db, 'projects'));
            setProjects(projectsSnapshot.docs.map((d) => ({ id: d.id, ...d.data() })));

            const mediaSnapshot = await getDocs(collection(db, 'media_gallery'));
            setMediaCount(mediaSnapshot.size);

            const bulletinsSnapshot = await getDocs(collection(db, 'bulletins'));
            setBulletinCount(bulletinsSnapshot.size);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const hash = window.location.hash.replace('#', '');
        if (hash === 'projects' || hash === 'media' || hash === 'stories') {
            setActiveTab(hash);
        }
    }, []);

    const handleDeleteStory = async (id) => {
        if (!window.confirm('Delete this story?')) return;
        try {
            await deleteDoc(doc(db, 'stories', id));
            fetchData();
        } catch (error) {
            console.error('Error deleting story:', error);
        }
    };

    const handleDeleteProject = async (id) => {
        if (!window.confirm('Delete this project?')) return;
        try {
            await deleteDoc(doc(db, 'projects', id));
            fetchData();
        } catch (error) {
            console.error('Error deleting project:', error);
        }
    };

    const filteredStories = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return stories;
        return stories.filter(
            (s) =>
                s.title?.toLowerCase().includes(q) ||
                s.description?.toLowerCase().includes(q) ||
                s.category?.toLowerCase().includes(q)
        );
    }, [stories, query]);

    const filteredProjects = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return projects;
        return projects.filter(
            (p) =>
                p.title?.toLowerCase().includes(q) ||
                p.category?.toLowerCase().includes(q)
        );
    }, [projects, query]);

    const hour = new Date().getHours();
    const greeting =
        hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

    if (loading) {
        return (
            <div className="admin-dashboard">
                <div className="admin-page-loading">
                    <div className="admin-loading-spinner" />
                    <p>Loading dashboard…</p>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-dashboard">
            <header className="admin-page-header">
                <div>
                    <p className="admin-eyebrow">{greeting}</p>
                    <h1>Dashboard</h1>
                    <p className="admin-subtitle">
                        Manage stories, projects, media, and bulletins from one place.
                    </p>
                </div>
            </header>

            <section className="admin-stats-grid">
                <button type="button" className="admin-stat-card" onClick={() => setActiveTab('stories')}>
                    <div className="admin-stat-icon stories">
                        <Newspaper size={22} />
                    </div>
                    <div className="admin-stat-info">
                        <span className="admin-stat-label">Stories</span>
                        <span className="admin-stat-value">{stories.length}</span>
                    </div>
                </button>
                <button type="button" className="admin-stat-card" onClick={() => setActiveTab('projects')}>
                    <div className="admin-stat-icon projects">
                        <FolderKanban size={22} />
                    </div>
                    <div className="admin-stat-info">
                        <span className="admin-stat-label">Projects</span>
                        <span className="admin-stat-value">{projects.length}</span>
                    </div>
                </button>
                <button type="button" className="admin-stat-card" onClick={() => setActiveTab('media')}>
                    <div className="admin-stat-icon media">
                        <ImageIcon size={22} />
                    </div>
                    <div className="admin-stat-info">
                        <span className="admin-stat-label">Media</span>
                        <span className="admin-stat-value">{mediaCount}</span>
                    </div>
                </button>
                <Link to="/admin/bulletins" className="admin-stat-card">
                    <div className="admin-stat-icon bulletins">
                        <Megaphone size={22} />
                    </div>
                    <div className="admin-stat-info">
                        <span className="admin-stat-label">Bulletins</span>
                        <span className="admin-stat-value">{bulletinCount}</span>
                    </div>
                </Link>
            </section>

            <section className="quick-actions">
                <h2 className="section-label">Quick actions</h2>
                <div className="quick-actions-grid">
                    <Link to="/admin/stories/new" className="quick-action-card">
                        <div className="quick-action-icon">
                            <Plus size={18} />
                        </div>
                        <div>
                            <strong>Add story</strong>
                            <span>News, press & articles</span>
                        </div>
                        <ArrowRight size={16} className="quick-action-arrow" />
                    </Link>
                    <Link to="/admin/projects/new" className="quick-action-card">
                        <div className="quick-action-icon">
                            <FolderOpen size={18} />
                        </div>
                        <div>
                            <strong>Add project</strong>
                            <span>Track railway projects</span>
                        </div>
                        <ArrowRight size={16} className="quick-action-arrow" />
                    </Link>
                    <Link to="/admin/media/upload" className="quick-action-card">
                        <div className="quick-action-icon">
                            <ImageIcon size={18} />
                        </div>
                        <div>
                            <strong>Upload media</strong>
                            <span>Photos & videos</span>
                        </div>
                        <ArrowRight size={16} className="quick-action-arrow" />
                    </Link>
                    <Link to="/admin/bulletins/upload" className="quick-action-card">
                        <div className="quick-action-icon">
                            <FileText size={18} />
                        </div>
                        <div>
                            <strong>Upload bulletin</strong>
                            <span>PDFs by directorate</span>
                        </div>
                        <ArrowRight size={16} className="quick-action-arrow" />
                    </Link>
                </div>
            </section>

            <section className="admin-panel">
                <div className="admin-panel-toolbar">
                    <div className="admin-segmented" role="tablist">
                        {[
                            { id: 'stories', label: 'Stories', count: stories.length },
                            { id: 'projects', label: 'Projects', count: projects.length },
                            { id: 'media', label: 'Media', count: mediaCount },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                type="button"
                                role="tab"
                                aria-selected={activeTab === tab.id}
                                className={`admin-segment ${activeTab === tab.id ? 'active' : ''}`}
                                onClick={() => {
                                    setActiveTab(tab.id);
                                    setQuery('');
                                }}
                            >
                                {tab.label}
                                <span className="segment-count">{tab.count}</span>
                            </button>
                        ))}
                    </div>

                    <div className="admin-panel-tools">
                        {activeTab !== 'media' && (
                            <div className="admin-search">
                                <Search size={16} />
                                <input
                                    type="search"
                                    placeholder={`Search ${activeTab}…`}
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                            </div>
                        )}
                        {activeTab === 'stories' && (
                            <Link to="/admin/stories/new" className="admin-btn-primary">
                                <Plus size={16} /> Add story
                            </Link>
                        )}
                        {activeTab === 'projects' && (
                            <Link to="/admin/projects/new" className="admin-btn-primary">
                                <Plus size={16} /> Add project
                            </Link>
                        )}
                    </div>
                </div>

                {activeTab === 'stories' && (
                    <>
                        <div className="admin-table-wrapper">
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Story</th>
                                        <th>Description</th>
                                        <th style={{ textAlign: 'right' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredStories.length === 0 ? (
                                        <tr>
                                            <td colSpan="3" className="empty-state">
                                                {query
                                                    ? 'No stories match your search.'
                                                    : 'No stories yet. Create one to get started.'}
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredStories.map((story) => (
                                            <tr key={story.id}>
                                                <td>
                                                    <div className="table-entity">
                                                        <img
                                                            src={story.image}
                                                            alt=""
                                                            className="table-image"
                                                        />
                                                        <div>
                                                            <div className="table-title">{story.title}</div>
                                                            {story.category && (
                                                                <span className="table-chip">{story.category}</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="table-desc">{story.description}</td>
                                                <td>
                                                    <div className="table-actions">
                                                        <Link
                                                            to={`/admin/stories/edit/${story.id}`}
                                                            className="action-btn edit"
                                                            title="Edit"
                                                        >
                                                            <Pencil size={16} />
                                                        </Link>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleDeleteStory(story.id)}
                                                            className="action-btn delete"
                                                            title="Delete"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className="mobile-cards">
                            {filteredStories.length === 0 ? (
                                <div className="empty-state">
                                    {query ? 'No stories match your search.' : 'No stories yet.'}
                                </div>
                            ) : (
                                filteredStories.map((story) => (
                                    <div key={story.id} className="mobile-card">
                                        <div className="mobile-card-header">
                                            <img
                                                src={story.image}
                                                alt=""
                                                className="mobile-card-image"
                                            />
                                            <div className="mobile-card-info">
                                                <div className="mobile-card-title">{story.title}</div>
                                                <div className="mobile-card-meta">
                                                    {story.category || 'Story'}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mobile-card-desc">{story.description}</div>
                                        <div className="mobile-card-footer">
                                            <span />
                                            <div className="mobile-card-actions">
                                                <Link
                                                    to={`/admin/stories/edit/${story.id}`}
                                                    className="action-btn edit"
                                                >
                                                    <Pencil size={16} />
                                                </Link>
                                                <button
                                                    type="button"
                                                    onClick={() => handleDeleteStory(story.id)}
                                                    className="action-btn delete"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </>
                )}

                {activeTab === 'projects' && (
                    <>
                        <div className="admin-table-wrapper">
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Project</th>
                                        <th>Category</th>
                                        <th>Progress</th>
                                        <th style={{ textAlign: 'right' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredProjects.length === 0 ? (
                                        <tr>
                                            <td colSpan="4" className="empty-state">
                                                {query
                                                    ? 'No projects match your search.'
                                                    : 'No projects yet. Create one to get started.'}
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredProjects.map((project) => (
                                            <tr key={project.id}>
                                                <td>
                                                    <div className="table-entity">
                                                        {project.coverImage ? (
                                                            <img
                                                                src={project.coverImage}
                                                                alt=""
                                                                className="table-image"
                                                            />
                                                        ) : (
                                                            <div className="table-image table-image-placeholder">
                                                                <FolderOpen size={18} />
                                                            </div>
                                                        )}
                                                        <div className="table-title">{project.title}</div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className="table-chip">{project.category || '—'}</span>
                                                </td>
                                                <td>
                                                    <div className="progress-cell">
                                                        <div className="progress-bar">
                                                            <div
                                                                className="progress-fill"
                                                                style={{
                                                                    width: `${project.completionPercentage || 0}%`,
                                                                    background:
                                                                        project.completionPercentage >= 100
                                                                            ? '#16a34a'
                                                                            : 'var(--color-primary)',
                                                                }}
                                                            />
                                                        </div>
                                                        <span className="progress-text">
                                                            {project.completionPercentage || 0}%
                                                        </span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="table-actions">
                                                        <Link
                                                            to={`/admin/projects/edit/${project.id}`}
                                                            className="action-btn edit"
                                                            title="Edit"
                                                        >
                                                            <Pencil size={16} />
                                                        </Link>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleDeleteProject(project.id)}
                                                            className="action-btn delete"
                                                            title="Delete"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className="mobile-cards">
                            {filteredProjects.length === 0 ? (
                                <div className="empty-state">
                                    {query ? 'No projects match your search.' : 'No projects yet.'}
                                </div>
                            ) : (
                                filteredProjects.map((project) => (
                                    <div key={project.id} className="mobile-card">
                                        <div className="mobile-card-header">
                                            {project.coverImage ? (
                                                <img
                                                    src={project.coverImage}
                                                    alt=""
                                                    className="mobile-card-image"
                                                />
                                            ) : (
                                                <div className="mobile-card-image table-image-placeholder">
                                                    <FolderOpen size={22} />
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
                                                            background:
                                                                project.completionPercentage >= 100
                                                                    ? '#16a34a'
                                                                    : 'var(--color-primary)',
                                                        }}
                                                    />
                                                </div>
                                                <span className="progress-text">
                                                    {project.completionPercentage || 0}%
                                                </span>
                                            </div>
                                            <div className="mobile-card-actions">
                                                <Link
                                                    to={`/admin/projects/edit/${project.id}`}
                                                    className="action-btn edit"
                                                >
                                                    <Pencil size={16} />
                                                </Link>
                                                <button
                                                    type="button"
                                                    onClick={() => handleDeleteProject(project.id)}
                                                    className="action-btn delete"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </>
                )}

                {activeTab === 'media' && (
                    <div className="admin-embedded-media">
                        <MediaManager />
                    </div>
                )}
            </section>
        </div>
    );
};

export default Dashboard;
