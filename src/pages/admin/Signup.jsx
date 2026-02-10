import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigate('/admin/dashboard');
        } catch (err) {
            setError(err.message);
            console.error(err);
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #003d23 0%, #006B3F 50%, #004d2c 100%)' }}>
            <div style={{ backgroundColor: 'white', padding: '2.5rem', borderRadius: '16px', boxShadow: '0 20px 40px rgba(0, 50, 30, 0.3)', width: '100%', maxWidth: '420px', border: '1px solid rgba(255, 215, 0, 0.2)', position: 'relative', overflow: 'hidden' }}>
                {/* Gold accent bar */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, #FFD700, #FFE44D, #FFD700)' }} />
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-primary-dark)' }}>Create Admin Account</h1>
                    <p style={{ color: 'var(--color-text-light)' }}>Register a new administrator</p>
                </div>

                {error && <div style={{ backgroundColor: '#FEE2E2', color: '#B91C1C', padding: '0.75rem', borderRadius: 'var(--radius-md)', marginBottom: '1rem', fontSize: '0.875rem' }}>{error}</div>}

                <form onSubmit={handleSignup}>
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
                        Register
                    </button>
                </form>
                <div style={{ marginTop: '1.25rem', textAlign: 'center' }}>
                    <Link to="/admin/login" style={{ color: 'var(--color-primary)', fontSize: '0.875rem', fontWeight: '600' }}>Back to Login</Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;
