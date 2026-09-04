import React, { useEffect, useState } from 'react';
import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase';
import {
    LayoutDashboard,
    Image as ImageIcon,
    FileText,
    LogOut,
    Menu,
    X,
    ExternalLink,
    Plus,
    Newspaper,
    FolderKanban,
} from 'lucide-react';
import './AdminLayout.css';

const AdminLayout = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        setSidebarOpen(false);
    }, [location.pathname]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    if (loading) {
        return (
            <div className="admin-loading">
                <div className="admin-loading-spinner" />
                <span>Loading admin…</span>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/admin/login" state={{ from: location }} replace />;
    }

    const path = location.pathname || '';

    const navItems = [
        {
            to: '/admin/dashboard',
            icon: LayoutDashboard,
            label: 'Dashboard',
            active: path.includes('/admin/dashboard') || path === '/admin' || path === '/admin/',
        },
        {
            to: '/admin/media',
            icon: ImageIcon,
            label: 'Media',
            active: path.includes('/admin/media'),
        },
        {
            to: '/admin/bulletins',
            icon: FileText,
            label: 'Bulletins',
            active: path.includes('/admin/bulletins'),
        },
    ];

    const initials = (user.email || 'A')
        .split('@')[0]
        .slice(0, 2)
        .toUpperCase();

    return (
        <div className="admin-layout">
            <header className="admin-mobile-header">
                <button
                    type="button"
                    className="menu-toggle"
                    onClick={() => setSidebarOpen(true)}
                    aria-label="Open menu"
                >
                    <Menu size={22} />
                </button>
                <div className="mobile-logo">
                    <img src="/grda-logo.png" alt="GRDA" />
                    <span>Admin</span>
                </div>
                <Link to="/admin/stories/new" className="mobile-quick-add" aria-label="Add story">
                    <Plus size={20} />
                </Link>
            </header>

            <div
                className={`sidebar-overlay ${sidebarOpen ? 'active' : ''}`}
                onClick={() => setSidebarOpen(false)}
                role="presentation"
            />

            <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <div className="sidebar-brand">
                        <img src="/grda-logo.png" alt="GRDA Logo" />
                        <div>
                            <strong>GRDA</strong>
                            <span>Content Admin</span>
                        </div>
                    </div>
                    <button
                        type="button"
                        className="close-sidebar"
                        onClick={() => setSidebarOpen(false)}
                        aria-label="Close menu"
                    >
                        <X size={22} />
                    </button>
                </div>

                <div className="sidebar-quick">
                    <Link to="/admin/stories/new" className="sidebar-quick-btn">
                        <Newspaper size={16} />
                        New story
                    </Link>
                    <Link to="/admin/bulletins/upload" className="sidebar-quick-btn">
                        <FileText size={16} />
                        Upload bulletin
                    </Link>
                </div>

                <nav className="sidebar-nav">
                    <div className="nav-section">
                        <div className="nav-section-label">Manage</div>
                        {navItems.map(({ to, icon: Icon, label, active }) => (
                            <Link
                                key={to}
                                to={to}
                                className={`admin-nav-link ${active ? 'active' : ''}`}
                            >
                                <Icon size={18} />
                                <span>{label}</span>
                            </Link>
                        ))}
                    </div>

                    <div className="nav-section">
                        <div className="nav-section-label">Create</div>
                        <Link
                            to="/admin/stories/new"
                            className={`admin-nav-link ${path.includes('/admin/stories') ? 'active' : ''}`}
                        >
                            <Newspaper size={18} />
                            <span>Stories</span>
                        </Link>
                        <Link
                            to="/admin/projects/new"
                            className={`admin-nav-link ${path.includes('/admin/projects') ? 'active' : ''}`}
                        >
                            <FolderKanban size={18} />
                            <span>Projects</span>
                        </Link>
                    </div>
                </nav>

                <div className="sidebar-footer">
                    <a
                        href="/#/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="view-site-link"
                    >
                        <ExternalLink size={16} />
                        View live site
                    </a>
                    <div className="user-card">
                        <div className="user-avatar">{initials}</div>
                        <div className="user-meta">
                            <span className="user-name">Administrator</span>
                            <span className="user-email">{user.email}</span>
                        </div>
                    </div>
                    <button type="button" onClick={handleLogout} className="logout-btn">
                        <LogOut size={18} />
                        Sign out
                    </button>
                </div>
            </aside>

            <main className="admin-main">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
