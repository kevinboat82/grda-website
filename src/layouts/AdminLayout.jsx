import React, { useEffect, useState } from 'react';
import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { LayoutDashboard, PlusCircle, LogOut, Image as ImageIcon, Menu, X } from 'lucide-react';
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

    // Close sidebar on route change
    useEffect(() => {
        setSidebarOpen(false);
    }, [location.pathname]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    if (loading) return <div className="admin-loading">Loading...</div>;

    if (!user) {
        return <Navigate to="/admin/login" state={{ from: location }} replace />;
    }

    const navLinks = [
        { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { to: '/admin/stories/new', icon: PlusCircle, label: 'Add Story' },
        { to: '/admin/media', icon: ImageIcon, label: 'Media Gallery' },
    ];

    return (
        <div className="admin-layout">
            {/* Mobile Header */}
            <header className="admin-mobile-header">
                <button className="menu-toggle" onClick={() => setSidebarOpen(true)}>
                    <Menu size={24} />
                </button>
                <div className="mobile-logo">
                    <img src="/grda-logo.png" alt="GRDA" />
                    <span>Admin</span>
                </div>
            </header>

            {/* Sidebar Overlay */}
            <div
                className={`sidebar-overlay ${sidebarOpen ? 'active' : ''}`}
                onClick={() => setSidebarOpen(false)}
            />

            {/* Sidebar */}
            <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <img src="/grda-logo.png" alt="GRDA Logo" />
                    <span>GRDA Admin</span>
                    <button className="close-sidebar" onClick={() => setSidebarOpen(false)}>
                        <X size={24} />
                    </button>
                </div>

                <nav className="sidebar-nav">
                    {navLinks.map(({ to, icon: Icon, label }) => (
                        <Link
                            key={to}
                            to={to}
                            className={`admin-nav-link ${location.pathname === to || (to !== '/admin/dashboard' && location.pathname?.startsWith(to)) ? 'active' : ''}`}
                        >
                            <Icon size={20} />
                            {label}
                        </Link>
                    ))}
                </nav>

                <div className="sidebar-footer">
                    <div className="user-email">{user.email}</div>
                    <button onClick={handleLogout} className="logout-btn">
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="admin-main">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
