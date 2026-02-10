import React, { useState } from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';

// City coordinates (aligned with accurate Ghana map outline)
// Ghana: roughly 4.5°N-11.2°N latitude, 3.3°W-1.2°E longitude
// Mapped to viewBox 0 0 400 520 for proper aspect ratio
const cities = {
    // Southern Coast - Gulf of Guinea
    takoradi: { x: 105, y: 478, name: 'Takoradi' },
    sekondi: { x: 95, y: 480, name: 'Sekondi' },
    capeCost: { x: 155, y: 472, name: 'Cape Coast' },
    accra: { x: 240, y: 465, name: 'Accra' },
    tema: { x: 265, y: 460, name: 'Tema' },

    // Central/Ashanti Belt
    tarkwa: { x: 115, y: 435, name: 'Tarkwa' },
    dunkwa: { x: 140, y: 395, name: 'Dunkwa' },
    awaso: { x: 95, y: 365, name: 'Awaso' },
    obuasi: { x: 165, y: 355, name: 'Obuasi' },
    kumasi: { x: 175, y: 315, name: 'Kumasi' },
    nyinahin: { x: 135, y: 335, name: 'Nyinahin' },
    koforidua: { x: 260, y: 410, name: 'Koforidua' },
    mpakadan: { x: 295, y: 375, name: 'Mpakadan' },

    // Brong-Ahafo/Savannah 
    techiman: { x: 165, y: 260, name: 'Techiman' },

    // Northern Region
    tamale: { x: 200, y: 160, name: 'Tamale' },
    yendi: { x: 270, y: 155, name: 'Yendi' },

    // Upper Regions
    bolgatanga: { x: 225, y: 85, name: 'Bolgatanga' },
    paga: { x: 230, y: 50, name: 'Paga' },

    // Trans-national (Burkina Faso - outside map)
    ouagadougou: { x: 290, y: 15, name: 'Ouagadougou (BF)', isForeign: true },
};

// Railway routes configuration
const existingRoutes = [
    {
        id: 'western-narrow',
        name: 'Western Line (Narrow Gauge)',
        distance: '340 km',
        status: 'Operational',
        path: 'M 105 478 L 115 435 L 140 395 L 165 355 L 175 315',
        cities: ['Takoradi', 'Tarkwa', 'Dunkwa', 'Obuasi', 'Kumasi'],
    },
    {
        id: 'awaso-branch',
        name: 'Dunkwa-Awaso Branch',
        distance: '58 km',
        status: 'Operational',
        path: 'M 140 395 L 95 365',
        cities: ['Dunkwa', 'Awaso'],
    },
    {
        id: 'tema-mpakadan',
        name: 'Tema-Mpakadan Line',
        distance: '97 km',
        status: 'Operational',
        path: 'M 265 460 L 295 375',
        cities: ['Tema', 'Mpakadan'],
    },
];

const masterPlanRoutes = [
    // Phase 1 - Green
    {
        id: 'western-std',
        name: 'Western Line (Standard Gauge)',
        distance: '340 km',
        phase: 1,
        path: 'M 95 480 L 105 478 L 115 435 L 140 395 L 165 355 L 175 315',
        cities: ['Sekondi', 'Takoradi', 'Tarkwa', 'Dunkwa', 'Obuasi', 'Kumasi'],
    },
    {
        id: 'eastern-std',
        name: 'Eastern Line (Standard Gauge)',
        distance: '300 km',
        phase: 1,
        path: 'M 240 465 L 260 410 L 275 360 L 215 340 L 175 315',
        cities: ['Accra', 'Koforidua', 'Kumasi'],
    },
    {
        id: 'nyinahin-branch',
        name: 'Kumasi-Nyinahin Branch',
        distance: '58 km',
        phase: 1,
        path: 'M 175 315 L 135 335',
        cities: ['Kumasi', 'Nyinahin'],
    },
    // Phase 2 - Blue
    {
        id: 'central-spine',
        name: 'Central Spine',
        distance: '595 km',
        phase: 2,
        path: 'M 175 315 L 165 260 L 200 160 L 225 85 L 230 50',
        cities: ['Kumasi', 'Techiman', 'Tamale', 'Bolgatanga', 'Paga'],
    },
    {
        id: 'tema-burkina',
        name: 'Ghana-Burkina Link',
        distance: '1,000 km',
        phase: 2,
        path: 'M 265 460 L 295 375 L 305 280 L 290 180 L 290 15',
        cities: ['Tema', 'Mpakadan', 'Ouagadougou'],
        isTransNational: true,
    },
    // Phase 3 - Yellow
    {
        id: 'tamale-yendi',
        name: 'Tamale-Yendi Branch',
        distance: '102 km',
        phase: 3,
        path: 'M 200 160 L 270 155',
        cities: ['Tamale', 'Yendi'],
    },
    {
        id: 'coastal-west',
        name: 'Coastal Line (West)',
        distance: 'TBD',
        phase: 3,
        path: 'M 105 478 L 155 472',
        cities: ['Takoradi', 'Cape Coast'],
    },
    {
        id: 'coastal-east',
        name: 'Coastal Line (East)',
        distance: 'TBD',
        phase: 3,
        path: 'M 155 472 L 240 465 L 265 460',
        cities: ['Cape Coast', 'Accra', 'Tema'],
    },
];

const phaseColors = {
    1: '#16a34a', // Green - Phase 1
    2: '#2563eb', // Blue - Phase 2
    3: '#eab308', // Yellow - Phase 3
};

const InteractiveMap = () => {
    const [activeTab, setActiveTab] = useState('existing');
    const [hoveredRoute, setHoveredRoute] = useState(null);
    const [hoveredCity, setHoveredCity] = useState(null);
    useScrollAnimation();

    const getPhaseLabel = (phase) => {
        switch (phase) {
            case 1: return 'Phase 1 (2020-2025)';
            case 2: return 'Phase 2 (2025-2030)';
            case 3: return 'Phase 3 (2030-2035)';
            default: return '';
        }
    };

    const renderCityMarker = (city, key, isActive = false) => (
        <g
            key={key}
            onMouseEnter={() => setHoveredCity(city)}
            onMouseLeave={() => setHoveredCity(null)}
            style={{ cursor: 'pointer' }}
        >
            <circle
                cx={city.x}
                cy={city.y}
                r={hoveredCity?.name === city.name ? 9 : 6}
                fill={city.isForeign ? '#9333ea' : (isActive ? '#bf9647' : '#64748b')} // Using Gold (#bf9647) for active cities in new theme
                stroke="white"
                strokeWidth="2"
                style={{ transition: 'all 0.2s', zIndex: 50 }}
            />
            {hoveredCity?.name === city.name && (
                <g style={{ pointerEvents: 'none', zIndex: 100 }}>
                    <rect
                        x={city.x + 10}
                        y={city.y - 15}
                        width={city.name.length * 8 + 12}
                        height={24}
                        rx="4"
                        fill="rgba(0,0,0,0.85)"
                    />
                    <text
                        x={city.x + 16}
                        y={city.y + 2}
                        fontSize="12"
                        fill="white"
                        fontWeight="500"
                    >
                        {city.name}
                    </text>
                </g>
            )}
        </g>
    );

    // Coordinate Transformation Config
    // Maps original 400x520 space to new 1000x1000 space
    // Tuned manually to align with gh.svg
    const transformX = (x) => (x * 2.15) + 35;
    const transformY = (y) => (y * 1.85) + 25;

    // Helper to transform path strings "M x y L x y..."
    const transformPath = (pathString) => {
        return pathString.replace(/([0-9.]+)\s+([0-9.]+)/g, (match, x, y) => {
            return `${transformX(parseFloat(x))} ${transformY(parseFloat(y))}`;
        });
    };

    return (
        <div className="animate-on-scroll fade-in" style={{
            backgroundColor: '#f8fafc',
            borderRadius: 'var(--radius-lg)',
            padding: '2rem',
            boxShadow: 'var(--shadow-md)',
        }}>
            <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--color-primary-dark)' }}>
                    Ghana Railway Network Master Plan
                </h3>
                <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1rem' }}>
                    Revised Railway Master Plan 2020-2035 • Total: 3,884 km
                </p>
                <div style={{ display: 'inline-flex', backgroundColor: '#e2e8f0', borderRadius: 'var(--radius-lg)', padding: '0.25rem' }}>
                    <button
                        onClick={() => setActiveTab('existing')}
                        style={{
                            padding: '0.6rem 1.5rem',
                            border: 'none',
                            borderRadius: 'var(--radius-md)',
                            backgroundColor: activeTab === 'existing' ? 'white' : 'transparent',
                            color: activeTab === 'existing' ? 'var(--color-primary)' : '#64748b',
                            fontWeight: '600',
                            boxShadow: activeTab === 'existing' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            fontSize: '0.9rem',
                        }}
                    >
                        Existing Network
                    </button>
                    <button
                        onClick={() => setActiveTab('planned')}
                        style={{
                            padding: '0.6rem 1.5rem',
                            border: 'none',
                            borderRadius: 'var(--radius-md)',
                            backgroundColor: activeTab === 'planned' ? 'white' : 'transparent',
                            color: activeTab === 'planned' ? 'var(--color-primary)' : '#64748b',
                            fontWeight: '600',
                            boxShadow: activeTab === 'planned' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            fontSize: '0.9rem',
                        }}
                    >
                        Master Plan 2035
                    </button>
                </div>
            </div>

            <div style={{
                position: 'relative',
                width: '100%',
                backgroundColor: '#e8f4f0',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                border: '1px solid #d1e7dd',
                minHeight: '500px'
            }}>
                <svg
                    viewBox="0 0 1000 1000"
                    style={{
                        width: '100%',
                        height: 'auto',
                        maxHeight: '700px',
                        backgroundColor: '#f1f5f9',
                    }}
                >
                    {/* Base Map Image - The unified background for both tabs */}
                    <image
                        href="/images/gh.svg"
                        x="0"
                        y="0"
                        width="1000"
                        height="1000"
                        opacity="0.35"
                    />

                    {/* CONTENT FOR EXISTING ROUTES TAB */}
                    {activeTab === 'existing' && (
                        <>
                            {existingRoutes.map((route) => (
                                <g key={route.id}
                                    onMouseEnter={() => setHoveredRoute(route.id)}
                                    onMouseLeave={() => setHoveredRoute(null)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <path
                                        d={transformPath(route.path)}
                                        fill="none"
                                        stroke={hoveredRoute === route.id ? 'rgba(17, 94, 61, 0.15)' : 'transparent'}
                                        strokeWidth="20"
                                        strokeLinecap="round"
                                        style={{ transition: 'all 0.3s' }}
                                    />
                                    <path
                                        d={transformPath(route.path)}
                                        fill="none"
                                        stroke="#115E3D"
                                        strokeWidth="5"
                                        strokeLinecap="round"
                                        strokeDasharray="8,5"
                                    />
                                </g>
                            ))}

                            {Object.values(cities).map((city, index) => {
                                // Filter cities for Existing Network view logic (only show relevant ones or main ones)
                                const isRelevant = existingRoutes.some(r => r.cities.includes(city.name));
                                // Show major cities always for context
                                const isMajor = ['Accra', 'Kumasi', 'Tamale', 'Takoradi'].includes(city.name);

                                if (isRelevant || isMajor) {
                                    const projectedCity = {
                                        ...city,
                                        x: transformX(city.x),
                                        y: transformY(city.y)
                                    };
                                    return renderCityMarker(projectedCity, `existing-${index}`, isRelevant);
                                }
                                return null;
                            })}
                        </>
                    )}

                    {/* CONTENT FOR MASTER PLAN TAB */}
                    {activeTab === 'planned' && (
                        <>
                            {masterPlanRoutes.map((route) => (
                                <g key={route.id}
                                    onMouseEnter={() => setHoveredRoute(route.id)}
                                    onMouseLeave={() => setHoveredRoute(null)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <path
                                        d={transformPath(route.path)}
                                        fill="none"
                                        stroke={hoveredRoute === route.id ? `${phaseColors[route.phase]}30` : 'transparent'}
                                        strokeWidth="25"
                                        strokeLinecap="round"
                                        style={{ transition: 'all 0.3s' }}
                                    />
                                    <path
                                        d={transformPath(route.path)}
                                        fill="none"
                                        stroke={phaseColors[route.phase]}
                                        strokeWidth={route.isTransNational ? "6" : "7"}
                                        strokeDasharray={route.isTransNational ? "10,6" : "0"}
                                        strokeLinecap="round"
                                        opacity="0.9"
                                    />
                                </g>
                            ))}

                            {Object.values(cities).map((city, index) => {
                                const projectedCity = {
                                    ...city,
                                    x: transformX(city.x),
                                    y: transformY(city.y)
                                };
                                const isActive = masterPlanRoutes.some(r => r.cities.includes(city.name));
                                return renderCityMarker(projectedCity, `planned-${index}`, isActive);
                            })}
                        </>
                    )}
                </svg>

                {/* SHARED TOOLTIPS & OVERLAYS */}
                {hoveredRoute && (
                    <div style={{
                        position: 'absolute',
                        top: '1rem',
                        left: '1rem',
                        backgroundColor: 'white',
                        padding: '1rem',
                        borderRadius: 'var(--radius-md)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                        maxWidth: '280px',
                        zIndex: 30,
                    }}>
                        {(() => {
                            const route = activeTab === 'existing'
                                ? existingRoutes.find(r => r.id === hoveredRoute)
                                : masterPlanRoutes.find(r => r.id === hoveredRoute);

                            return route ? (
                                <>
                                    <h4 style={{ margin: '0 0 0.5rem 0', color: route.phase ? phaseColors[route.phase] : '#115E3D', fontSize: '1rem' }}>{route.name}</h4>
                                    <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.85rem', color: '#64748b' }}>Distance: <span style={{ fontWeight: '500', color: '#334155' }}>{route.distance}</span></p>
                                    <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.85rem', color: '#16a34a', fontWeight: '500' }}>
                                        {route.phase ? getPhaseLabel(route.phase) : `Status: ${route.status}`}
                                    </p>
                                    <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.8rem', color: '#94a3b8', borderTop: '1px solid #f1f5f9', paddingTop: '0.5rem' }}>
                                        {route.cities.join(' → ')}
                                    </p>
                                </>
                            ) : null;
                        })()}
                    </div>
                )}

                {/* LEGENDS */}
                <div style={{
                    position: 'absolute',
                    bottom: '1rem',
                    right: '1rem',
                    backgroundColor: 'white',
                    padding: '1rem',
                    borderRadius: 'var(--radius-md)',
                    boxShadow: 'var(--shadow-md)',
                    fontSize: '0.8rem',
                    zIndex: 20
                }}>
                    {activeTab === 'existing' ? (
                        <>
                            <div style={{ fontWeight: '600', marginBottom: '0.5rem', color: '#333' }}>Existing Network</div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={{ width: '24px', height: '4px', backgroundColor: '#115E3D', marginRight: '0.5rem', borderRadius: '2px', borderStyle: 'dashed' }}></div>
                                <span style={{ color: '#64748b' }}>Operational</span>
                            </div>
                        </>
                    ) : (
                        <>
                            <div style={{ fontWeight: '600', marginBottom: '0.5rem', color: '#1e293b' }}>Master Plan Phases</div>
                            {[1, 2, 3].map(phase => (
                                <div key={phase} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.4rem' }}>
                                    <div style={{ width: '16px', height: '16px', borderRadius: '4px', backgroundColor: phaseColors[phase], marginRight: '0.5rem' }}></div>
                                    <span style={{ color: '#64748b' }}>{getPhaseLabel(phase).split('(')[0]}</span>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default InteractiveMap;
