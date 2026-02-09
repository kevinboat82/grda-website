import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc, collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase';
import { ArrowLeft, Calendar, Clock, ChevronRight, Archive, X } from 'lucide-react';
import { archiveStories, getArchiveMonths } from '../data/archiveStories';
import './StoryDetail.css';

const StoryDetail = () => {
    const { id } = useParams();
    const [story, setStory] = useState(null);
    const [recentPosts, setRecentPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    // Check if this is an archive story
    const isArchive = id?.startsWith('archive-');

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch recent posts from Firebase
                const storiesRef = collection(db, "stories");
                const q = query(storiesRef, orderBy("createdAt", "desc"), limit(5));
                const querySnapshot = await getDocs(q);
                const recentData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setRecentPosts(recentData);

                // Fetch current story
                if (isArchive) {
                    // Find in archive stories
                    const archiveStory = archiveStories.find(s => s.id === id);
                    if (archiveStory) {
                        setStory({
                            ...archiveStory,
                            createdAt: new Date(archiveStory.date)
                        });
                    } else {
                        setError("Story not found");
                    }
                } else {
                    // Fetch from Firebase
                    const storyDoc = await getDoc(doc(db, "stories", id));
                    if (storyDoc.exists()) {
                        setStory({ id: storyDoc.id, ...storyDoc.data() });
                    } else {
                        setError("Story not found");
                    }
                }
            } catch (err) {
                console.error("Error fetching story:", err);
                setError("Failed to load story");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id, isArchive]);

    // Format the date
    const formatDate = (timestamp) => {
        if (!timestamp) return null;
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Format short date for sidebar
    const formatShortDate = (timestamp) => {
        if (!timestamp) return 'Recent';
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        });
    };

    // Split content into paragraphs
    const renderContent = (content) => {
        if (!content) return <p className="no-content">Full story content coming soon.</p>;
        return content.split('\n\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
        ));
    };

    // Get archive months for sidebar
    const archiveMonths = getArchiveMonths();

    if (loading) {
        return (
            <div className="story-detail-loading">
                <div className="loading-spinner"></div>
                <p>Loading story...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="story-detail-error">
                <h2>{error}</h2>
                <Link to="/" className="btn btn-primary">Return Home</Link>
            </div>
        );
    }

    return (
        <article className="story-detail">
            {/* Hero Image */}
            <div
                className="story-hero"
                style={{ backgroundImage: `url(${story.image})` }}
            >
                <div className="story-hero-overlay">
                    <div className="container">
                        <Link to="/media" className="back-link">
                            <ArrowLeft size={20} />
                            Back to Blog
                        </Link>
                        <h1>{story.title}</h1>
                        {story.createdAt && (
                            <div className="story-meta">
                                <Calendar size={16} />
                                <span>{formatDate(story.createdAt)}</span>
                                {story.category && (
                                    <span className="story-category">{story.category}</span>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Two-Column Layout */}
            <div className="container">
                <div className="story-layout">
                    {/* Main Content */}
                    <div className="story-content">
                        {/* Lead paragraph / description */}
                        <p className="story-lead">{story.description}</p>

                        {/* Full content */}
                        <div className="story-body">
                            {renderContent(story.content)}
                        </div>

                        {/* External link if provided */}
                        {story.link && (
                            <div className="story-cta">
                                <a href={story.link} className="btn btn-primary">
                                    {story.linkText || 'Learn More'}
                                </a>
                            </div>
                        )}

                        {/* Story Gallery */}
                        {story.gallery && story.gallery.length > 0 && (
                            <div className="story-gallery-section">
                                <h3>Photo Gallery</h3>
                                <div className="detail-gallery-grid">
                                    {story.gallery.map((imgUrl, index) => (
                                        <div
                                            key={index}
                                            className="detail-gallery-item"
                                            onClick={() => setSelectedImage(imgUrl)}
                                        >
                                            <img src={imgUrl} alt={`Gallery ${index + 1}`} />
                                            <div className="gallery-overlay">
                                                <span className="view-text">View</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Back to stories */}
                        <div className="story-footer">
                            <Link to="/media" className="btn btn-outline">
                                <ArrowLeft size={18} />
                                Back to Blog
                            </Link>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <aside className="story-sidebar">
                        {/* Recent Posts Widget */}
                        <div className="sidebar-widget">
                            <h3 className="widget-title">
                                <Clock size={18} />
                                Recent Posts
                            </h3>
                            <ul className="recent-posts-list">
                                {recentPosts.length > 0 ? (
                                    recentPosts.map(post => (
                                        <li key={post.id} className="recent-post-item">
                                            <Link to={`/stories/${post.id}`}>
                                                <div className="recent-post-image">
                                                    <img src={post.image} alt={post.title} />
                                                </div>
                                                <div className="recent-post-info">
                                                    <span className="recent-post-title">{post.title}</span>
                                                    <span className="recent-post-date">{formatShortDate(post.createdAt)}</span>
                                                </div>
                                            </Link>
                                        </li>
                                    ))
                                ) : (
                                    <li className="no-posts">No recent posts</li>
                                )}
                            </ul>
                        </div>

                        {/* Archives Widget */}
                        <div className="sidebar-widget">
                            <h3 className="widget-title">
                                <Archive size={18} />
                                Archives
                            </h3>
                            <ul className="archives-list">
                                {archiveMonths.map((month, idx) => (
                                    <li key={idx} className="archive-item">
                                        <Link to={`/media?archive=${month.label.replace(' ', '-')}`}>
                                            <ChevronRight size={14} />
                                            <span className="archive-month">{month.label}</span>
                                            <span className="archive-count">({month.count})</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Archive Stories Preview */}
                        <div className="sidebar-widget">
                            <h3 className="widget-title">Past Stories</h3>
                            <ul className="archive-stories-list">
                                {archiveStories.slice(0, 5).map(story => (
                                    <li key={story.id}>
                                        <Link to={`/stories/${story.id}`}>
                                            <span className="archive-story-title">{story.title}</span>
                                            <span className="archive-story-date">{formatShortDate(new Date(story.date))}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>
                </div>
            </div>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div className="lightbox-overlay" onClick={() => setSelectedImage(null)}>
                    <button className="lightbox-close" onClick={() => setSelectedImage(null)}>
                        <X size={32} />
                    </button>
                    <div className="lightbox-content" onClick={e => e.stopPropagation()}>
                        <img src={selectedImage} alt="Full size" />
                    </div>
                </div>
            )}
        </article>
    );
};

export default StoryDetail;
