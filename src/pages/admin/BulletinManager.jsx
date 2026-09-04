import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { db, storage } from '../../firebase';
import { Link } from 'react-router-dom';
import {
    Plus, Trash2, FileText, Search, ExternalLink, Calendar, Building2
} from 'lucide-react';
import { getSourceLabel } from '../../data/bulletinSources';
import './Admin.css';

const BulletinManager = () => {
    const [bulletins, setBulletins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState('all');

    const fetchBulletins = async () => {
        setLoading(true);
        try {
            const snapshot = await getDocs(collection(db, 'bulletins'));
            const items = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
            items.sort((a, b) => {
                const dateA = a.createdAt?.seconds || 0;
                const dateB = b.createdAt?.seconds || 0;
                return dateB - dateA;
            });
            setBulletins(items);
        } catch (error) {
            console.error('Error fetching bulletins:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBulletins();
    }, []);

    const handleDelete = async (item) => {
        if (!window.confirm(`Delete bulletin "${item.title}"?`)) return;

        try {
            if (item.storagePath) {
                try {
                    await deleteObject(ref(storage, item.storagePath));
                } catch (storageErr) {
                    console.warn('Storage delete skipped:', storageErr.message);
                }
            }
            await deleteDoc(doc(db, 'bulletins', item.id));
            fetchBulletins();
        } catch (error) {
            console.error('Error deleting bulletin:', error);
            alert('Failed to delete bulletin.');
        }
    };

    const formatDate = (timestamp) => {
        if (!timestamp) return '—';
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        if (Number.isNaN(date.getTime())) return '—';
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const formatSize = (bytes) => {
        if (!bytes) return '';
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    };

    const filtered = bulletins.filter((b) => {
        const q = searchQuery.toLowerCase();
        const matchesSearch =
            !q ||
            b.title?.toLowerCase().includes(q) ||
            b.sourceName?.toLowerCase().includes(q);
        const matchesType = filterType === 'all' || b.sourceType === filterType;
        return matchesSearch && matchesType;
    });

    if (loading) {
        return (
            <div className="admin-dashboard">
                <p>Loading bulletins...</p>
            </div>
        );
    }

    return (
        <div className="admin-dashboard">
            <header className="admin-page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                    <p className="admin-eyebrow">Publish</p>
                    <h1>Bulletins</h1>
                    <p className="admin-subtitle">
                        Upload and manage PDF notices from directorates and units.
                    </p>
                </div>
                <Link to="/admin/bulletins/upload" className="admin-btn-primary">
                    <Plus size={16} /> Upload bulletin
                </Link>
            </header>

            <section className="admin-panel">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', padding: '1rem 1.15rem', borderBottom: '1px solid rgba(15, 41, 28, 0.06)', background: '#fafbfa', alignItems: 'center' }}>
                <div className="admin-search" style={{ flex: '1 1 240px', maxWidth: '360px' }}>
                    <Search size={16} />
                    <input
                        type="search"
                        placeholder="Search bulletins..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    style={{
                        padding: '0.55rem 0.75rem',
                        borderRadius: '10px',
                        border: '1px solid rgba(15, 41, 28, 0.1)',
                        background: 'white',
                        fontSize: '0.875rem',
                    }}
                >
                    <option value="all">All sources</option>
                    <option value="directorate">Directorates</option>
                    <option value="unit">Units</option>
                    <option value="authority">Authority</option>
                </select>
            </div>

            <div className="admin-table-wrapper">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Source</th>
                            <th>Date</th>
                            <th>File</th>
                            <th style={{ textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="empty-state">
                                    No bulletins yet. Upload one to get started.
                                </td>
                            </tr>
                        ) : (
                            filtered.map((item) => (
                                <tr key={item.id}>
                                    <td className="table-title">
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <FileText size={18} color="var(--color-primary)" />
                                            {item.title}
                                        </div>
                                    </td>
                                    <td>
                                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                                            <Building2 size={14} />
                                            {getSourceLabel(item.sourceType, item.sourceId, item.sourceName)}
                                        </span>
                                    </td>
                                    <td>
                                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: '#6b7280' }}>
                                            <Calendar size={14} />
                                            {formatDate(item.publishedAt || item.createdAt)}
                                        </span>
                                    </td>
                                    <td style={{ fontSize: '0.85rem', color: '#6b7280' }}>
                                        {item.fileName || 'PDF'}
                                        {item.fileSize ? ` · ${formatSize(item.fileSize)}` : ''}
                                    </td>
                                    <td>
                                        <div className="table-actions">
                                            <a
                                                href={item.fileUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="action-btn edit"
                                                title="Open PDF"
                                            >
                                                <ExternalLink size={18} />
                                            </a>
                                            <button
                                                type="button"
                                                onClick={() => handleDelete(item)}
                                                className="action-btn delete"
                                                title="Delete"
                                            >
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

            <div className="mobile-cards">
                {filtered.length === 0 ? (
                    <div className="empty-state">No bulletins yet. Upload one to get started.</div>
                ) : (
                    filtered.map((item) => (
                        <div key={item.id} className="mobile-card">
                            <div className="mobile-card-header">
                                <div
                                    className="mobile-card-image"
                                    style={{
                                        background: 'rgba(0, 107, 63, 0.08)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <FileText size={24} color="var(--color-primary)" />
                                </div>
                                <div className="mobile-card-info">
                                    <div className="mobile-card-title">{item.title}</div>
                                    <div className="mobile-card-meta">
                                        {getSourceLabel(item.sourceType, item.sourceId, item.sourceName)}
                                    </div>
                                </div>
                            </div>
                            <div className="mobile-card-footer">
                                <span style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                                    {formatDate(item.publishedAt || item.createdAt)}
                                </span>
                                <div className="mobile-card-actions">
                                    <a
                                        href={item.fileUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="action-btn edit"
                                    >
                                        <ExternalLink size={18} />
                                    </a>
                                    <button
                                        type="button"
                                        onClick={() => handleDelete(item)}
                                        className="action-btn delete"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
            </section>
        </div>
    );
};

export default BulletinManager;
