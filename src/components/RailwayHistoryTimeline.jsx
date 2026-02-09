import React from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';

const milestones = [
    { year: "1898", title: "First Railway Line", description: "Construction of the Sekondi-Tarkwa line began, marking the birth of Ghana's railway system." },
    { year: "1903", title: "Kumasi Connected", description: "The railway line extended to Kumasi, linking the coast to the resource-rich Ashanti region." },
    { year: "1923", title: "Accra-Kumasi Line", description: "Completion of the Eastern Line connected Accra to Kumasi, completing the Golden Triangle." },
    { year: "2008", title: "GRDA Established", description: "The Ghana Railway Development Authority was established by Act 779 to promote and regulate the sector." },
    { year: "2018", title: "Railway Master Plan", description: "Launch of the ambitious Master Plan to modernize and expand the network to 4,000km." },
    { year: "2024", title: "Tema-Mpakadan Line", description: "Commissioning of the 97km standard gauge line, a major milestone in modern rail transport." },
];

const RailwayHistoryTimeline = () => {
    useScrollAnimation();

    return (
        <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto', padding: '2rem 0' }}>
            {/* Center Line */}
            <div style={{
                position: 'absolute',
                left: '50%',
                top: 0,
                bottom: 0,
                width: '4px',
                backgroundColor: 'var(--color-primary-light)', // Assuming a lighter shade variable exists or use hardcoded
                transform: 'translateX(-50%)',
                zIndex: 0
            }}></div>

            {milestones.map((item, index) => (
                <div
                    key={index}
                    className={`timeline-item animate-on-scroll ${index % 2 === 0 ? 'slide-left' : 'slide-right'}`}
                    style={{
                        display: 'flex',
                        justifyContent: index % 2 === 0 ? 'flex-end' : 'flex-start',
                        paddingBottom: '3rem',
                        position: 'relative'
                    }}
                >
                    {/* Dot on Line */}
                    <div style={{
                        position: 'absolute',
                        left: '50%',
                        width: '20px',
                        height: '20px',
                        backgroundColor: 'var(--color-primary)',
                        border: '4px solid white',
                        borderRadius: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 1,
                        boxShadow: '0 0 0 2px var(--color-primary)'
                    }}></div>

                    {/* Content Box */}
                    <div style={{
                        width: '45%',
                        textAlign: index % 2 === 0 ? 'right' : 'left',
                        padding: '0 2rem'
                    }}>
                        <div style={{
                            fontSize: '2rem',
                            fontWeight: 'bold',
                            color: 'var(--color-secondary)',
                            marginBottom: '0.5rem'
                        }}>
                            {item.year}
                        </div>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#1f2937' }}>{item.title}</h3>
                        <p style={{ color: '#4b5563', lineHeight: '1.6' }}>{item.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default RailwayHistoryTimeline;
