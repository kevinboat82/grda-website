import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { Link, useSearchParams } from 'react-router-dom';
import { Calendar, ArrowRight, X, ChevronLeft, ChevronRight, Images, Search, Clock, Archive, Newspaper, Megaphone, FileText, CalendarDays } from 'lucide-react';
import { archiveStories, getArchiveMonths } from '../data/archiveStories';
import './Media.css';

// Category definitions
const CATEGORIES = [
    { value: 'all', label: 'All Posts', icon: null },
    { value: 'news', label: 'News & Updates', icon: 'Newspaper' },
    { value: 'press', label: 'Press Releases', icon: 'Megaphone' },
    { value: 'articles', label: 'Articles', icon: 'FileText' },
    { value: 'events', label: 'Events', icon: 'CalendarDays' }
];

const getCategoryLabel = (value) => {
    const cat = CATEGORIES.find(c => c.value === value);
    return cat ? cat.label : value;
};

const getCategoryColor = (value) => {
    const colors = {
        news: '#10b981',
        press: '#3b82f6',
        articles: '#8b5cf6',
        events: '#f59e0b'
    };
    return colors[value] || '#6b7280';
};

const Media = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [stories, setStories] = useState([]);
    const [galleryImages, setGalleryImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');
    const [showAllPhotos, setShowAllPhotos] = useState(false);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    // Get selected archive month from URL params
    const selectedArchiveMonth = searchParams.get('archive')?.replace('-', ' ') || null;

    // Number of photos to show in preview
    const PREVIEW_COUNT = 6;

    // Get archive stories for the selected month
    const getFilteredArchiveStories = () => {
        if (!selectedArchiveMonth) return [];
        return archiveStories.filter(story => {
            const date = new Date(story.date);
            const storyMonth = `${date.toLocaleString('en-US', { month: 'long' })} ${date.getFullYear()}`;
            return storyMonth === selectedArchiveMonth;
        });
    };

    const filteredArchiveStories = getFilteredArchiveStories();

    // Clear archive filter
    const clearArchiveFilter = () => {
        setSearchParams({});
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch Stories
                const storiesSnapshot = await getDocs(collection(db, "stories"));
                const storiesData = storiesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                // Sort by createdAt descending
                storiesData.sort((a, b) => {
                    const dateA = a.createdAt?.toDate?.() || new Date(a.createdAt) || new Date(0);
                    const dateB = b.createdAt?.toDate?.() || new Date(b.createdAt) || new Date(0);
                    return dateB - dateA;
                });
                setStories(storiesData);

                // Fetch Media Gallery
                const mediaSnapshot = await getDocs(collection(db, "media_gallery"));
                const media = mediaSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                // Sort by createdAt descending
                media.sort((a, b) => {
                    const dateA = a.createdAt?.toDate?.() || new Date(a.createdAt) || new Date(0);
                    const dateB = b.createdAt?.toDate?.() || new Date(b.createdAt) || new Date(0);
                    return dateB - dateA;
                });
                setGalleryImages(media);
            } catch (error) {
                console.error("Error fetching media content:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Format date helper
    const formatDate = (timestamp) => {
        if (!timestamp) return 'Recent';
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    // Filter stories by search and category
    const filteredStories = stories.filter(story => {
        const matchesSearch = searchQuery === '' ||
            story.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            story.description?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = activeCategory === 'all' || story.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    // Get archive months for sidebar
    const archiveMonths = getArchiveMonths();

    // Lightbox functions
    const openLightbox = (index) => {
        setLightboxIndex(index);
        setLightboxOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
        document.body.style.overflow = '';
    };

    const nextImage = () => {
        setLightboxIndex((prev) => (prev + 1) % galleryImages.length);
    };

    const prevImage = () => {
        setLightboxIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
    };

    // Handle keyboard navigation for lightbox
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!lightboxOpen) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [lightboxOpen]);

    if (loading) {
        return (
            <div style={{ padding: '4rem', textAlign: 'center' }}>
                <div className="loading-spinner"></div>
                <p style={{ marginTop: '1rem', color: '#6b7280' }}>Loading content...</p>
            </div>
        );
    }

    const featuredStory = filteredStories[0];
    const otherStories = filteredStories.slice(1);
    const visiblePhotos = showAllPhotos ? galleryImages : galleryImages.slice(0, PREVIEW_COUNT);
    const remainingCount = galleryImages.length - PREVIEW_COUNT;

    return (
        <>
            {/* Page Header */}
            <div className="page-header blog-header">
                <div className="container">
                    <h1>Blog & Media</h1>
                    <p>Latest news, updates, and stories from the Ghana Railway Development Authority.</p>
                </div>
            </div>

            {/* Search and Filter Section */}
            <section className="blog-filters container">
                {/* Search Bar */}
                <div className="search-bar">
                    <Search size={20} className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search stories..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                    />
                    {searchQuery && (
                        <button className="search-clear" onClick={() => setSearchQuery('')}>
                            <X size={16} />
                        </button>
                    )}
                </div>

                {/* Category Tabs */}
                <div className="category-tabs">
                    {CATEGORIES.map(cat => {
                        const IconComponent = cat.icon === 'Newspaper' ? Newspaper :
                            cat.icon === 'Megaphone' ? Megaphone :
                                cat.icon === 'FileText' ? FileText :
                                    cat.icon === 'CalendarDays' ? CalendarDays : null;
                        return (
                            <button
                                key={cat.value}
                                className={`category-tab ${activeCategory === cat.value ? 'active' : ''}`}
                                onClick={() => setActiveCategory(cat.value)}
                            >
                                {IconComponent && <IconComponent size={16} />}
                                {cat.label}
                            </button>
                        );
                    })}
                </div>
            </section>

            {/* Main Content with Sidebar */}
            <section className="section container">
                <div className="blog-layout">
                    {/* Main Content Area */}
                    <div className="blog-main">
                        {/* Archive Stories View */}
                        {selectedArchiveMonth ? (
                            <>
                                <div className="archive-header">
                                    <h2 className="section-title">
                                        <Archive size={24} />
                                        Archives: {selectedArchiveMonth}
                                    </h2>
                                    <button className="btn btn-outline" onClick={clearArchiveFilter}>
                                        <X size={16} />
                                        Back to All Stories
                                    </button>
                                </div>

                                {filteredArchiveStories.length === 0 ? (
                                    <div className="empty-state">
                                        <p>No archived stories found for {selectedArchiveMonth}.</p>
                                        <button className="btn btn-outline" onClick={clearArchiveFilter}>
                                            Back to All Stories
                                        </button>
                                    </div>
                                ) : (
                                    <div className="stories-grid">
                                        {filteredArchiveStories.map(story => (
                                            <Link to={`/stories/${story.id}`} key={story.id} className="story-card">
                                                <div
                                                    className="story-image"
                                                    style={{ backgroundImage: `url('${story.image}')` }}
                                                >
                                                    {story.category && (
                                                        <span
                                                            className="card-category-badge"
                                                            style={{ backgroundColor: getCategoryColor(story.category) }}
                                                        >
                                                            {getCategoryLabel(story.category)}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="story-content">
                                                    <span className="story-date">
                                                        <Calendar size={12} />
                                                        {formatDate(new Date(story.date))}
                                                    </span>
                                                    <h4 className="story-title">{story.title}</h4>
                                                    <p className="story-excerpt">{story.description}</p>
                                                    <span className="story-link">Read More →</span>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </>
                        ) : (
                            <>
                                <h2 className="section-title">
                                    {activeCategory === 'all' ? 'Latest Stories' : getCategoryLabel(activeCategory)}
                                    {searchQuery && <span className="search-results-count"> ({filteredStories.length} results)</span>}
                                </h2>

                                {filteredStories.length === 0 ? (
                                    <div className="empty-state">
                                        <p>No stories found{searchQuery ? ` for "${searchQuery}"` : ' in this category'}.</p>
                                        <button className="btn btn-outline" onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}>
                                            Clear Filters
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        {/* Featured Story */}
                                        {featuredStory && (
                                            <Link to={`/stories/${featuredStory.id}`} className="featured-story">
                                                <div
                                                    className="featured-image"
                                                    style={{ backgroundImage: `url('${featuredStory.image}')` }}
                                                />
                                                <div className="featured-content">
                                                    <div className="featured-badges">
                                                        <span className="featured-badge">Latest</span>
                                                        {featuredStory.category && (
                                                            <span
                                                                className="category-badge"
                                                                style={{ backgroundColor: getCategoryColor(featuredStory.category) }}
                                                            >
                                                                {getCategoryLabel(featuredStory.category)}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <h3 className="featured-title">{featuredStory.title}</h3>
                                                    <p className="featured-excerpt">{featuredStory.description}</p>
                                                    <div className="featured-meta">
                                                        <span className="featured-date">
                                                            <Calendar size={14} />
                                                            {formatDate(featuredStory.createdAt)}
                                                        </span>
                                                        <span className="featured-link">
                                                            Read Full Story <ArrowRight size={16} />
                                                        </span>
                                                    </div>
                                                </div>
                                            </Link>
                                        )}

                                        {/* Other Stories Grid */}
                                        {otherStories.length > 0 && (
                                            <div className="stories-grid">
                                                {otherStories.map(story => (
                                                    <Link to={`/stories/${story.id}`} key={story.id} className="story-card">
                                                        <div
                                                            className="story-image"
                                                            style={{ backgroundImage: `url('${story.image}')` }}
                                                        >
                                                            {story.category && (
                                                                <span
                                                                    className="card-category-badge"
                                                                    style={{ backgroundColor: getCategoryColor(story.category) }}
                                                                >
                                                                    {getCategoryLabel(story.category)}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="story-content">
                                                            <span className="story-date">
                                                                <Calendar size={12} />
                                                                {formatDate(story.createdAt)}
                                                            </span>
                                                            <h4 className="story-title">{story.title}</h4>
                                                            <p className="story-excerpt">{story.description}</p>
                                                            <span className="story-link">Read More →</span>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </>
                                )}
                            </>
                        )}
                    </div>

                    {/* Sidebar */}
                    <aside className="blog-sidebar">
                        {/* Recent Posts Widget */}
                        <div className="sidebar-widget">
                            <h3 className="widget-title">
                                <Clock size={18} />
                                Recent Posts
                            </h3>
                            <ul className="recent-posts-list">
                                {stories.slice(0, 5).map(post => (
                                    <li key={post.id} className="recent-post-item">
                                        <Link to={`/stories/${post.id}`}>
                                            <div className="recent-post-image">
                                                <img src={post.image} alt={post.title} />
                                            </div>
                                            <div className="recent-post-info">
                                                <span className="recent-post-title">{post.title}</span>
                                                <span className="recent-post-date">{formatDate(post.createdAt)}</span>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
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

                        {/* Past Stories */}
                        <div className="sidebar-widget">
                            <h3 className="widget-title">Past Stories</h3>
                            <ul className="archive-stories-list">
                                {archiveStories.slice(0, 5).map(story => (
                                    <li key={story.id}>
                                        <Link to={`/stories/${story.id}`}>
                                            <span className="archive-story-title">{story.title}</span>
                                            <span className="archive-story-date">{formatDate(new Date(story.date))}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>
                </div>
            </section>

            {/* Photo Gallery Section */}
            <section className="section container gallery-section">
                <div className="gallery-header">
                    <h2 className="section-title">
                        <Images size={24} />
                        Photo Gallery
                    </h2>
                    {galleryImages.length > PREVIEW_COUNT && (
                        <button
                            className="btn btn-outline gallery-toggle"
                            onClick={() => setShowAllPhotos(!showAllPhotos)}
                        >
                            {showAllPhotos ? 'Show Less' : `View All ${galleryImages.length} Photos`}
                        </button>
                    )}
                </div>

                {galleryImages.length === 0 ? (
                    <p className="empty-state">No photos in the gallery yet.</p>
                ) : (
                    <div className={`gallery-grid ${showAllPhotos ? 'expanded' : ''}`}>
                        {visiblePhotos.map((item, index) => (
                            <div
                                key={item.id}
                                className="gallery-item"
                                onClick={() => openLightbox(showAllPhotos ? index : index)}
                            >
                                <img
                                    src={item.imageUrl}
                                    alt={item.caption || "Gallery Image"}
                                    loading="lazy"
                                />
                                {item.caption && (
                                    <div className="gallery-caption">
                                        {item.caption}
                                    </div>
                                )}
                                {/* Show +X more on last preview item */}
                                {!showAllPhotos && index === PREVIEW_COUNT - 1 && remainingCount > 0 && (
                                    <div className="gallery-more-overlay">
                                        <span>+{remainingCount}</span>
                                        <small>more photos</small>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* Lightbox Modal */}
            {lightboxOpen && galleryImages.length > 0 && (
                <div className="lightbox" onClick={closeLightbox}>
                    <button className="lightbox-close" onClick={closeLightbox}>
                        <X size={24} />
                    </button>

                    <button
                        className="lightbox-nav lightbox-prev"
                        onClick={(e) => { e.stopPropagation(); prevImage(); }}
                    >
                        <ChevronLeft size={32} />
                    </button>

                    <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                        <img
                            src={galleryImages[lightboxIndex]?.imageUrl}
                            alt={galleryImages[lightboxIndex]?.caption || "Photo"}
                        />
                        {galleryImages[lightboxIndex]?.caption && (
                            <p className="lightbox-caption">{galleryImages[lightboxIndex].caption}</p>
                        )}
                        <p className="lightbox-counter">
                            {lightboxIndex + 1} / {galleryImages.length}
                        </p>
                    </div>

                    <button
                        className="lightbox-nav lightbox-next"
                        onClick={(e) => { e.stopPropagation(); nextImage(); }}
                    >
                        <ChevronRight size={32} />
                    </button>
                </div>
            )}
        </>
    );
};

export default Media;
