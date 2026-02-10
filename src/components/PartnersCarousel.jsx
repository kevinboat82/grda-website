import { useEffect, useRef } from 'react';
import './PartnersCarousel.css';

const partners = [
    {
        name: 'Amandi Investment',
        category: 'Construction',
        logo: '/images/partners/amandi.png'
    },
    {
        name: 'PESA',
        category: 'Rolling Stock',
        logo: '/images/partners/pesa.jpeg'
    },
    {
        name: 'Afcons Infrastructure',
        category: 'Infrastructure',
        logo: '/images/partners/afcons.jpeg'
    },
    {
        name: 'GE Transportation',
        category: 'Locomotives',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/General_Electric_logo.svg/320px-General_Electric_logo.svg.png'
    },
    {
        name: 'Ministry of Transport',
        category: 'Government',
        logo: '/images/partners/mot.jpeg'
    },
    {
        name: 'World Bank',
        category: 'Funding Partner',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/The_World_Bank_logo.svg/320px-The_World_Bank_logo.svg.png'
    },
    {
        name: 'African Development Bank',
        category: 'Funding Partner',
        logo: '/images/partners/adb.png'
    },
    {
        name: 'Ghana Railway Company Limited',
        category: 'Operations',
        logo: '/images/partners/grcl.png'
    },
    {
        name: 'Ministry of Finance',
        category: 'Government',
        logo: '/images/partners/mof.png'
    },
];

const PartnersCarousel = () => {
    const trackRef = useRef(null);

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        // Clone items for seamless loop
        const items = track.querySelectorAll('.partner-item');
        items.forEach((item) => {
            const clone = item.cloneNode(true);
            track.appendChild(clone);
        });
    }, []);

    return (
        <section className="partners-section">
            <div className="container">
                <div className="partners-header">
                    <span className="partners-badge">Trusted Partners</span>
                    <h2>Working Together for Ghana's Railway Future</h2>
                    <p>Collaborating with world-class organizations to deliver excellence</p>
                </div>
            </div>

            <div className="partners-carousel">
                <div className="partners-track" ref={trackRef}>
                    {partners.map((partner, index) => (
                        <div key={index} className="partner-item">
                            <div className="partner-logo-img">
                                <img
                                    src={partner.logo}
                                    alt={`${partner.name} logo`}
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'flex';
                                    }}
                                />
                                <span className="partner-initials-fallback" style={{ display: 'none' }}>
                                    {partner.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                                </span>
                            </div>
                            <div className="partner-info">
                                <span className="partner-name">{partner.name}</span>
                                <span className="partner-category">{partner.category}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="partners-cta">
                <p>Interested in partnering with GRDA?</p>
                <a href="/contact" className="btn btn-outline">Get in Touch</a>
            </div>
        </section>
    );
};

export default PartnersCarousel;
