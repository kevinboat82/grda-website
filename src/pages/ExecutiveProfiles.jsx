import React from 'react';

const executives = [
    {
        id: 1,
        name: "Ing. Yaw Owusu",
        role: "Chief Executive Officer",
        bio: "Leading the authority with a vision for detailed railway expansion and modernization.",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 2,
        name: "Director A",
        role: "Director of Engineering",
        bio: "Overseeing technical standards and infrastructure development.",
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 3,
        name: "Director B",
        role: "Director of Finance",
        bio: "Managing financial sustainability and investment strategies.",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 4,
        name: "Director C",
        role: "Director of Legal",
        bio: "Ensuring regulatory compliance and legal governance.",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
];

const ExecutiveProfiles = () => {
    return (
        <div className="page-wrapper">
            <div className="page-header">
                <div className="container">
                    <h1>Executive Management</h1>
                    <p>The leadership team driving the daily operations and success of GRDA.</p>
                </div>
            </div>

            <section className="section container">
                <div className="items-list" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {executives.map(exec => (
                        <div key={exec.id} className="exec-card" style={{ display: 'flex', background: 'white', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)', alignItems: 'center', gap: '2rem' }}>
                            <div style={{ width: '200px', height: '200px', flexShrink: 0 }}>
                                <img src={exec.image} alt={exec.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <div style={{ padding: '2rem', flex: 1 }}>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--color-primary)' }}>{exec.name}</h3>
                                <div style={{ color: 'var(--color-secondary)', fontWeight: '600', marginBottom: '1rem', textTransform: 'uppercase', fontSize: '0.875rem', letterSpacing: '1px' }}>{exec.role}</div>
                                <p style={{ color: 'var(--color-text-light)', lineHeight: '1.6' }}>{exec.bio}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default ExecutiveProfiles;
