import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, ArrowRight } from 'lucide-react';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/admin/dashboard');
        } catch (err) {
            setError('Failed to sign in. Check your email and password.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-auth-page">
            <div className="admin-auth-shell">
                <aside className="admin-auth-brand">
                    <div className="admin-auth-brand-inner">
                        <div className="admin-auth-logo-wrap">
                            <img
                                src="/grda-logo.png"
                                alt="Ghana Railway Development Authority"
                            />
                        </div>
                        <h1>GRDA Content Admin</h1>
                        <p>
                            Manage stories, projects, media, and bulletins for the
                            Ghana Railway Development Authority website.
                        </p>
                        <Link to="/" className="admin-auth-back-site">
                            ← Back to website
                        </Link>
                    </div>
                </aside>

                <section className="admin-auth-panel">
                    <div className="admin-auth-panel-inner">
                        <div className="admin-auth-mobile-logo">
                            <img src="/grda-logo.png" alt="GRDA" />
                        </div>

                        <div className="admin-auth-heading">
                            <p className="admin-auth-eyebrow">Welcome back</p>
                            <h2>Sign in</h2>
                            <p>Use your admin account to continue.</p>
                        </div>

                        {error && <div className="admin-auth-error" role="alert">{error}</div>}

                        <form onSubmit={handleLogin} className="admin-auth-form">
                            <label htmlFor="login-email">Email</label>
                            <div className="admin-auth-input">
                                <Mail size={18} />
                                <input
                                    type="email"
                                    id="login-email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    autoComplete="email"
                                    placeholder="you@grda.gov.gh"
                                />
                            </div>

                            <label htmlFor="login-password">Password</label>
                            <div className="admin-auth-input">
                                <Lock size={18} />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="login-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    autoComplete="current-password"
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    className="admin-auth-eye"
                                    onClick={() => setShowPassword((v) => !v)}
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>

                            <button type="submit" className="admin-auth-submit" disabled={loading}>
                                {loading ? 'Signing in…' : 'Sign in'}
                                {!loading && <ArrowRight size={18} />}
                            </button>
                        </form>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Login;
