import { useEffect, useRef } from 'react';
import './PartnersCarousel.css';

const partners = [
    {
        name: 'Amandi Investment',
        category: 'Construction',
        logo: 'https://amandiinvestment.com/wp-content/uploads/2020/02/cropped-AMANDI-LOGO-2.png'
    },
    {
        name: 'PESA',
        category: 'Rolling Stock',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Logo_Pesa.svg/320px-Logo_Pesa.svg.png'
    },
    {
        name: 'Afcons Infrastructure',
        category: 'Infrastructure',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Logo_of_AFCONS.svg/320px-Logo_of_AFCONS.svg.png'
    },
    {
        name: 'GE Transportation',
        category: 'Locomotives',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/General_Electric_logo.svg/320px-General_Electric_logo.svg.png'
    },
    {
        name: 'Ministry of Transport',
        category: 'Government',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Coat_of_arms_of_Ghana.svg/200px-Coat_of_arms_of_Ghana.svg.png'
    },
    {
        name: 'China Railway',
        category: 'Engineering',
        logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f3/China_Railway_logo.svg/200px-China_Railway_logo.svg.png'
    },
    {
        name: 'World Bank',
        category: 'Funding Partner',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/The_World_Bank_logo.svg/320px-The_World_Bank_logo.svg.png'
    },
    {
        name: 'African Development Bank',
        category: 'Funding Partner',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/African_Development_Bank_logo.svg/320px-African_Development_Bank_logo.svg.png'
    },
    {
        name: 'Ghana Railway Company',
        category: 'Operations',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Coat_of_arms_of_Ghana.svg/200px-Coat_of_arms_of_Ghana.svg.png'
    },
    {
        name: 'Ministry of Finance',
        category: 'Government',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Coat_of_arms_of_Ghana.svg/200px-Coat_of_arms_of_Ghana.svg.png'
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
