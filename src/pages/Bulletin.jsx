import React, { useEffect, useState } from 'react';
import SEO from '../components/SEO';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import {
    Search, X, FileText, Download, Eye, Calendar, Building2, Users, Landmark
} from 'lucide-react';
import {
    DIRECTORATE_SOURCES,
    UNIT_SOURCES,
    getSourceLabel,
} from '../data/bulletinSources';
import './Bulletin.css';

const Bulletin = () => {
    const [bulletins, setBulletins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [sourceTypeFilter, setSourceTypeFilter] = useState('all');
    const [sourceFilter, setSourceFilter] = useState('all');
    const [viewer, setViewer] = useState(null);

    useEffect(() => {
        const fetchBulletins = async () => {
            try {
                const snapshot = await getDocs(collection(db, 'bulletins'));
                const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
                data.sort((a, b) => {
                    const dateA = a.createdAt?.toDate?.() || new Date(a.publishedAt || a.createdAt) || new Date(0);
                    const dateB = b.createdAt?.toDate?.() || new Date(b.publishedAt || b.createdAt) || new Date(0);
                    return dateB - dateA;
                });
                setBulletins(data);
            } catch (error) {
                console.error('Error fetching bulletins:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchBulletins();
    }, []);

    useEffect(() => {
        if (!viewer) return;
        const onKey = (e) => {
            if (e.key === 'Escape') setViewer(null);
        };
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', onKey);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', onKey);
        };
    }, [viewer]);

    const formatDate = (timestamp) => {
        if (!timestamp) return 'Recent';
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        if (Number.isNaN(date.getTime())) return 'Recent';
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const sourceOptions =
        sourceTypeFilter === 'directorate'
            ? DIRECTORATE_SOURCES
            : sourceTypeFilter === 'unit'
                ? UNIT_SOURCES
                : [];

    const filtered = bulletins.filter((b) => {
        const q = searchQuery.toLowerCase();
        const matchesSearch =
            !q ||
            b.title?.toLowerCase().includes(q) ||
            b.description?.toLowerCase().includes(q) ||
            b.sourceName?.toLowerCase().includes(q);

        const matchesType =
            sourceTypeFilter === 'all' || b.sourceType === sourceTypeFilter;

        const matchesSource =
            sourceFilter === 'all' || b.sourceId === sourceFilter;

        return matchesSearch && matchesType && matchesSource;
    });

    const SourceIcon = ({ type }) => {
        if (type === 'unit') return <Users size={12} />;
        if (type === 'authority') return <Landmark size={12} />;
        return <Building2 size={12} />;
    };

    if (loading) {
        return (
            <div className="bulletin-loading">
                <div className="loading-spinner" />
                <p style={{ marginTop: '1rem', color: '#6b7280' }}>Loading bulletins...</p>
            </div>
        );
    }

    return (
        <div className="bulletin-page">
            <SEO
                title="Bulletin"
                description="Official bulletins and circulars from GRDA directorates and units."
                url="/bulletin"
            />

            <div className="page-header bulletin-header">
                <div className="container">
                    <h1>Bulletin</h1>
                    <p>Official notices and circulars issued by GRDA directorates and specialized units.</p>
                </div>
            </div>

            <section className="bulletin-filters container">
                <div className="search-bar">
                    <Search size={20} className="search-icon" />
                    <input
                        type="search"
                        placeholder="Search bulletins..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                    />
                    {searchQuery && (
                        <button className="search-clear" onClick={() => setSearchQuery('')} type="button">
                            <X size={16} />
                        </button>
                    )}
                </div>

                <div className="bulletin-filter-row">
                    <span className="bulletin-filter-label">From</span>
                    {[
                        { value: 'all', label: 'All' },
                        { value: 'directorate', label: 'Directorates' },
                        { value: 'unit', label: 'Units' },
                        { value: 'authority', label: 'Authority' },
                    ].map((opt) => (
                        <button
                            key={opt.value}
                            type="button"
                            className={`bulletin-chip ${sourceTypeFilter === opt.value ? 'active' : ''}`}
                            onClick={() => {
                                setSourceTypeFilter(opt.value);
                                setSourceFilter('all');
                            }}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>

                {sourceOptions.length > 0 && (
                    <div className="bulletin-filter-row">
                        <span className="bulletin-filter-label">
                            {sourceTypeFilter === 'unit' ? 'Unit' : 'Directorate'}
                        </span>
                        <button
                            type="button"
                            className={`bulletin-chip ${sourceFilter === 'all' ? 'active' : ''}`}
                            onClick={() => setSourceFilter('all')}
                        >
                            All
                        </button>
                        {sourceOptions.map((s) => (
                            <button
                                key={s.id}
                                type="button"
                                className={`bulletin-chip ${sourceFilter === s.id ? 'active' : ''}`}
                                onClick={() => setSourceFilter(s.id)}
                            >
                                {s.shortName}
                            </button>
                        ))}
                    </div>
                )}
            </section>

            <section className="bulletin-section container">
                <p className="bulletin-count">
                    {filtered.length} bulletin{filtered.length !== 1 ? 's' : ''}
                </p>

                {filtered.length === 0 ? (
                    <div className="bulletin-empty">
                        <div className="bulletin-empty-icon">
                            <FileText size={28} />
                        </div>
                        <h3>No bulletins found</h3>
                        <p>
                            {bulletins.length === 0
                                ? 'Bulletins will appear here once published by the admin team.'
                                : 'Try adjusting your search or filters.'}
                        </p>
                    </div>
                ) : (
                    <div className="bulletin-grid">
                        {filtered.map((b) => (
                            <article key={b.id} className="bulletin-card">
                                <div className="bulletin-card-icon">
                                    <FileText size={24} />
                                </div>
                                <div className="bulletin-card-meta">
                                    <span className={`bulletin-source-badge ${b.sourceType || ''}`}>
                                        <SourceIcon type={b.sourceType} />
                                        {getSourceLabel(b.sourceType, b.sourceId, b.sourceName)}
                                    </span>
                                    <span className="bulletin-date">
                                        <Calendar size={12} />
                                        {formatDate(b.publishedAt || b.createdAt)}
                                    </span>
                                </div>
                                <h2 className="bulletin-card-title">{b.title}</h2>
                                {b.description && (
                                    <p className="bulletin-card-desc">{b.description}</p>
                                )}
                                <div className="bulletin-card-actions">
                                    <button
                                        type="button"
                                        className="bulletin-btn bulletin-btn-primary"
                                        onClick={() => setViewer(b)}
                                    >
                                        <Eye size={16} /> View
                                    </button>
                                    <a
                                        href={b.fileUrl}
                                        download={b.fileName || true}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bulletin-btn bulletin-btn-secondary"
                                    >
                                        <Download size={16} /> Download
                                    </a>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </section>

            {viewer && (
                <div
                    className="bulletin-viewer-overlay"
                    onClick={() => setViewer(null)}
                    role="presentation"
                >
                    <div
                        className="bulletin-viewer"
                        onClick={(e) => e.stopPropagation()}
                        role="dialog"
                        aria-modal="true"
                        aria-label={viewer.title}
                    >
                        <div className="bulletin-viewer-header">
                            <h3>{viewer.title}</h3>
                            <div className="bulletin-viewer-actions">
                                <a
                                    href={viewer.fileUrl}
                                    download={viewer.fileName || true}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title="Download"
                                >
                                    <Download size={18} />
                                </a>
                                <button type="button" onClick={() => setViewer(null)} title="Close" aria-label="Close">
                                    <X size={18} />
                                </button>
                            </div>
                        </div>
                        <div className="bulletin-viewer-body">
                            <iframe
                                src={viewer.fileUrl}
                                title={viewer.title}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Bulletin;
