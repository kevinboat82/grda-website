import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { Train } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/admin/dashboard');
        } catch (err) {
            setError('Failed to login. Please check your credentials.');
            console.error(err);
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #003d23 0%, #006B3F 50%, #004d2c 100%)' }}>
            <div style={{ backgroundColor: 'white', padding: '2.5rem', borderRadius: '16px', boxShadow: '0 20px 40px rgba(0, 50, 30, 0.3)', width: '100%', maxWidth: '420px', border: '1px solid rgba(255, 215, 0, 0.2)', position: 'relative', overflow: 'hidden' }}>
                {/* Gold accent bar */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, #FFD700, #FFE44D, #FFD700)' }} />
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                        <img src="/grda-logo.png" alt="GRDA Logo" style={{ height: '80px', width: 'auto' }} />
                    </div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-primary-dark)' }}>Admin Login</h1>
                    <p style={{ color: 'var(--color-text-light)' }}>Sign in to manage website content</p>
                </div>

                {error && <div style={{ backgroundColor: '#FEE2E2', color: '#B91C1C', padding: '0.75rem', borderRadius: 'var(--radius-md)', marginBottom: '1rem', fontSize: '0.875rem' }}>{error}</div>}

                <form onSubmit={handleLogin}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--color-primary-dark)' }}>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(0, 107, 63, 0.2)', outline: 'none' }}
                        />
                    </div>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--color-primary-dark)' }}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(0, 107, 63, 0.2)', outline: 'none' }}
                        />
                    </div>
                    <button
                        type="submit"
                        style={{ width: '100%', padding: '0.875rem', background: 'linear-gradient(135deg, #FFD700, #FDB913)', color: '#003d23', fontWeight: '700', border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontSize: '1rem', boxShadow: '0 4px 15px rgba(255, 215, 0, 0.3)' }}
                    >
                        Sign In
                    </button>
                </form>
                <div style={{ marginTop: '1.25rem', textAlign: 'center', fontSize: '0.875rem' }}>
                    <span style={{ color: '#6b7280' }}>Don't have an account? </span>
                    <a href="/admin/signup" style={{ color: 'var(--color-primary)', fontWeight: '600' }}>Register here</a>
                </div>
            </div>
        </div>
    );
};

export default Login;
