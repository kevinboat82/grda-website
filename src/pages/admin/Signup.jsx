import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, ArrowRight } from 'lucide-react';
import './Login.css';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigate('/admin/dashboard');
        } catch (err) {
            setError(err.message || 'Could not create account.');
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
                        <h1>Join GRDA Admin</h1>
                        <p>
                            Create an administrator account to publish and manage
                            website content.
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
                            <p className="admin-auth-eyebrow">New account</p>
                            <h2>Create admin</h2>
                            <p>Register with your work email.</p>
                        </div>

                        {error && <div className="admin-auth-error" role="alert">{error}</div>}

                        <form onSubmit={handleSignup} className="admin-auth-form">
                            <label htmlFor="signup-email">Email</label>
                            <div className="admin-auth-input">
                                <Mail size={18} />
                                <input
                                    type="email"
                                    id="signup-email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    autoComplete="email"
                                    placeholder="you@grda.gov.gh"
                                />
                            </div>

                            <label htmlFor="signup-password">Password</label>
                            <div className="admin-auth-input">
                                <Lock size={18} />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="signup-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    autoComplete="new-password"
                                    placeholder="Create a strong password"
                                    minLength={6}
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
                                {loading ? 'Creating…' : 'Create account'}
                                {!loading && <ArrowRight size={18} />}
                            </button>
                        </form>

                        <p className="admin-auth-footer">
                            Already have an account?{' '}
                            <Link to="/admin/login">Sign in</Link>
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Signup;
