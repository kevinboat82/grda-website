import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { db, storage } from '../../firebase';
import { Link } from 'react-router-dom';
import { Plus, Trash2, Image as ImageIcon, ArrowUpDown, Filter, Calendar, Tag, Search } from 'lucide-react';

const CATEGORIES = [
    'All',
    'General',
    'Railway Construction',
    'Station Development',
    'Infrastructure',
    'Events & Ceremonies',
    'Aerial Views',
    'Equipment & Machinery',
    'Community Engagement',
    'Press & Media'
];

const MediaManager = () => {
    const [mediaItems, setMediaItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState('newest'); // newest, oldest, name-asc, name-desc
    const [filterCategory, setFilterCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const fetchMedia = async () => {
        setLoading(true);
        try {
            const querySnapshot = await getDocs(collection(db, "media_gallery"));
            const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setMediaItems(items);
        } catch (error) {
            console.error("Error fetching media:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMedia();
    }, []);

    const handleDelete = async (id, imageUrl) => {
        if (window.confirm("Are you sure you want to delete this image?")) {
            try {
                await deleteDoc(doc(db, "media_gallery", id));
                fetchMedia();
            } catch (error) {
                console.error("Error deleting media:", error);
                alert("Failed to delete media.");
            }
        }
    };

    // Sort & filter logic
    const getFilteredAndSortedItems = () => {
        let filtered = [...mediaItems];

        // Filter by category
        if (filterCategory !== 'All') {
            filtered = filtered.filter(item => (item.category || 'General') === filterCategory);
        }

        // Filter by search query
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            filtered = filtered.filter(item =>
                (item.caption || '').toLowerCase().includes(q) ||
                (item.fileName || '').toLowerCase().includes(q) ||
                (item.category || '').toLowerCase().includes(q)
            );
        }

        // Sort
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'newest':
                    return (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0);
                case 'oldest':
                    return (a.createdAt?.seconds || 0) - (b.createdAt?.seconds || 0);
                case 'name-asc':
                    return (a.caption || a.fileName || '').localeCompare(b.caption || b.fileName || '');
                case 'name-desc':
                    return (b.caption || b.fileName || '').localeCompare(a.caption || a.fileName || '');
                default:
                    return 0;
            }
        });

        return filtered;
    };

    const displayItems = getFilteredAndSortedItems();

    const formatFileSize = (bytes) => {
        if (!bytes) return '';
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    };

    if (loading) return <div>Loading gallery...</div>;

    return (
        <div>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: 'var(--color-primary-dark)', margin: 0 }}>
                    Media Gallery
                    <span style={{ fontSize: '0.9rem', fontWeight: '400', color: '#6b7280', marginLeft: '0.75rem' }}>
                        {displayItems.length} of {mediaItems.length} items
                    </span>
                </h1>
                <Link to="/admin/media/upload" className="btn btn-primary" style={{
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                    background: 'linear-gradient(135deg, #FFD700, #FDB913)',
                    color: '#003d23', fontWeight: '600', padding: '0.625rem 1.25rem',
                    borderRadius: '8px', textDecoration: 'none', border: 'none',
                    boxShadow: '0 2px 8px rgba(255, 215, 0, 0.25)'
                }}>
                    <Plus size={18} /> Upload New
                </Link>
            </div>

            {/* Search Bar */}
            <div style={{ position: 'relative', marginBottom: '1rem' }}>
                <Search size={18} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                <input
                    type="text"
                    placeholder="Search by caption, filename, or category..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                        width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem',
                        borderRadius: '8px', border: '1px solid rgba(0, 107, 63, 0.15)',
                        fontSize: '0.9rem', outline: 'none', background: 'white'
                    }}
                />
            </div>

            {/* Filter & Sort Controls */}
            <div style={{
                display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap', alignItems: 'center',
                padding: '1rem', background: 'white', borderRadius: '10px',
                border: '1px solid rgba(0, 107, 63, 0.08)', boxShadow: '0 1px 4px rgba(0, 50, 30, 0.06)'
            }}>
                {/* Sort Dropdown */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ArrowUpDown size={16} color="var(--color-primary)" />
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        style={{
                            padding: '0.5rem 0.75rem', borderRadius: '6px',
                            border: '1px solid rgba(0, 107, 63, 0.15)', fontSize: '0.85rem',
                            color: '#374151', background: 'white', cursor: 'pointer', outline: 'none'
                        }}
                    >
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                        <option value="name-asc">Name A–Z</option>
                        <option value="name-desc">Name Z–A</option>
                    </select>
                </div>

                {/* Category Filter */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1, minWidth: 0 }}>
                    <Tag size={16} color="var(--color-primary)" style={{ flexShrink: 0 }} />
                    <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setFilterCategory(cat)}
                                style={{
                                    padding: '0.35rem 0.75rem',
                                    borderRadius: '6px',
                                    border: filterCategory === cat ? '1px solid var(--color-primary)' : '1px solid #e5e7eb',
                                    background: filterCategory === cat ? 'var(--color-primary)' : 'transparent',
                                    color: filterCategory === cat ? '#FFD700' : '#6b7280',
                                    cursor: 'pointer',
                                    fontWeight: filterCategory === cat ? '600' : '400',
                                    fontSize: '0.8rem',
                                    transition: 'all 0.2s',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Media Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.5rem' }}>
                {displayItems.length === 0 ? (
                    <div style={{
                        gridColumn: '1/-1', textAlign: 'center', padding: '3rem',
                        background: 'white', borderRadius: '12px',
                        border: '1px solid rgba(0, 107, 63, 0.08)'
                    }}>
                        <ImageIcon size={48} color="#9ca3af" style={{ marginBottom: '1rem' }} />
                        <p style={{ color: '#6b7280', marginBottom: '0.5rem' }}>
                            {mediaItems.length === 0
                                ? 'No media items found. Upload some photos to get started.'
                                : `No items match "${searchQuery || filterCategory}" filter.`
                            }
                        </p>
                        {(searchQuery || filterCategory !== 'All') && (
                            <button
                                onClick={() => { setSearchQuery(''); setFilterCategory('All'); }}
                                style={{
                                    background: 'none', border: '1px solid var(--color-primary)',
                                    color: 'var(--color-primary)', padding: '0.5rem 1rem',
                                    borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem'
                                }}
                            >
                                Clear Filters
                            </button>
                        )}
                    </div>
                ) : (
                    displayItems.map(item => (
                        <div key={item.id} style={{
                            background: 'white', borderRadius: '10px', overflow: 'hidden',
                            boxShadow: '0 2px 8px rgba(0, 50, 30, 0.08)', position: 'relative',
                            border: '1px solid rgba(0, 107, 63, 0.06)',
                            transition: 'all 0.2s'
                        }}>
                            <div style={{ aspectRatio: '4/3', overflow: 'hidden' }}>
                                <img src={item.imageUrl} alt={item.caption} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }} />
                            </div>
                            <div style={{ padding: '0.75rem' }}>
                                <p style={{ fontSize: '0.875rem', fontWeight: '600', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: '#1f2937', marginBottom: '0.25rem' }}>
                                    {item.caption || item.fileName || "Untitled"}
                                </p>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem' }}>
                                    <span style={{
                                        fontSize: '0.7rem', fontWeight: '500',
                                        padding: '0.2rem 0.5rem', borderRadius: '4px',
                                        background: 'rgba(0, 107, 63, 0.08)',
                                        color: 'var(--color-primary)',
                                        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                                    }}>
                                        {item.category || 'General'}
                                    </span>
                                    <span style={{ fontSize: '0.7rem', color: '#9ca3af', whiteSpace: 'nowrap' }}>
                                        {item.createdAt ? new Date(item.createdAt.seconds * 1000).toLocaleDateString() : '—'}
                                    </span>
                                </div>
                                {item.fileSize && (
                                    <p style={{ fontSize: '0.7rem', color: '#9ca3af', marginTop: '0.25rem' }}>
                                        {formatFileSize(item.fileSize)}
                                    </p>
                                )}
                            </div>
                            <button
                                onClick={() => handleDelete(item.id, item.imageUrl)}
                                style={{
                                    position: 'absolute', top: '0.5rem', right: '0.5rem',
                                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                    border: 'none', borderRadius: '50%',
                                    padding: '0.5rem', cursor: 'pointer',
                                    color: '#ef4444', boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                    transition: 'transform 0.2s'
                                }}
                                title="Delete Image"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default MediaManager;
